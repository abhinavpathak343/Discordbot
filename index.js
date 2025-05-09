import dotenv from 'dotenv';
import express from 'express';
import urlRoute from './routes/url.js'
import {
    connectDB
} from './connect.js';
import {
    Client,
    GatewayIntentBits,
    Collection,
    Events
} from 'discord.js';
import {
    data as shortenCommand,
    execute as shortenExecute
} from './command.js';
import QRCode from 'qrcode';
dotenv.config();

const app = express();

const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('No Discord token found in environment variables');
    process.exit(1);
}
const PORT = 8080;

// Add CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());
connectDB();
app.use("/url", urlRoute);
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// URL detection regex
const urlRegex = /(https?:\/\/[^\s]+)/g;

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Register slash commands
    try {
        await client.application.commands.create(shortenCommand);
        console.log('Slash commands registered successfully');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'shorten') {
        await shortenExecute(interaction);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check for URLs in the message
    const urls = message.content.match(urlRegex);

    if (urls) {
        for (const url of urls) {
            try {
                const response = await fetch('http://localhost:8080/url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        url
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    const shortUrl = `http://localhost:8080/url/${data.id}`;

                    // Extract website name from URL
                    const urlObj = new URL(url);
                    const websiteName = urlObj.hostname.replace('www.', '');

                    // Ask user which URL they want QR code for
                    await message.reply({
                        content: `I detected a URL in your message.\n\n**${websiteName}**\n\nHere's the shortened version: ${shortUrl}\n\nType:\n- "original" for QR code of original URL\n- "short" for QR code of shortened URL\n- "both" for QR codes of both URLs`
                    });

                    // Create message collector
                    const filter = m => m.author.id === message.author.id && ['original', 'short', 'both'].includes(m.content.toLowerCase());

                    const collector = message.channel.createMessageCollector({
                        filter,
                        time: 30000, // 30 seconds timeout
                        max: 1
                    });

                    collector.on('collect', async (response) => {
                        const choice = response.content.toLowerCase();

                        if (choice === 'original' || choice === 'both') {
                            // Generate QR code for original URL
                            const originalQR = await QRCode.toDataURL(url);
                            const originalBuffer = Buffer.from(originalQR.split(',')[1], 'base64');
                            await message.reply({
                                content: choice === 'both' ?
                                    `QR Codes for ${websiteName}:\n\nOriginal URL QR Code:\n(Click the image and select 'Save Image As...' to download)` : `QR Code for ${websiteName} (Original URL):\n(Click the image and select 'Save Image As...' to download)`,
                                files: [{
                                    attachment: originalBuffer,
                                    name: 'original_qrcode.png'
                                }]
                            });
                        }

                        if (choice === 'short' || choice === 'both') {
                            // Generate QR code for shortened URL
                            const shortQR = await QRCode.toDataURL(shortUrl);
                            const shortBuffer = Buffer.from(shortQR.split(',')[1], 'base64');
                            await message.reply({
                                content: choice === 'both' ?
                                    `Shortened URL QR Code:\n(Click the image and select 'Save Image As...' to download)` : `QR Code for ${websiteName} (Shortened URL):\n(Click the image and select 'Save Image As...' to download)`,
                                files: [{
                                    attachment: shortBuffer,
                                    name: 'shortened_qrcode.png'
                                }]
                            });
                        }
                    });

                    collector.on('end', collected => {
                        if (collected.size === 0) {
                            message.reply('No valid response received. QR code generation cancelled.');
                        }
                    });
                }
            } catch (error) {
                console.error('Error processing URL:', error);
                await message.reply('Sorry, there was an error processing your URL.');
            }
        }
    }
});

client.login(token);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});