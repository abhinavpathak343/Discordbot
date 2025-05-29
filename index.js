import express from 'express';
import cors from 'cors';
import {
    nanoid
} from 'nanoid';
import {
    Client,
    GatewayIntentBits,
    Collection,
    REST,
    Routes
} from 'discord.js';
import {
    fileURLToPath,
    pathToFileURL
} from 'url';
import {
    dirname,
    join
} from 'path';
import {
    config
} from 'dotenv';
import {
    readdirSync
} from 'fs';

// Load environment variables
config();

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const port = process.env.PORT || 8080;

// Initialize Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// URL storage (in-memory for now)
const urlMap = new Map();

// Middleware
app.use(cors());
app.use(express.json());

// URL shortening endpoint
app.post('/url', (req, res) => {
    const {
        url
    } = req.body;
    if (!url) {
        return res.status(400).json({
            error: 'URL is required'
        });
    }

    const id = nanoid(6);
    urlMap.set(id, url);
    res.json({
        id,
        url
    });
});

// URL redirection endpoint
app.get('/url/:id', (req, res) => {
    const {
        id
    } = req.params;
    const url = urlMap.get(id);
    if (!url) {
        return res.status(404).json({
            error: 'URL not found'
        });
    }
    res.redirect(url);
});

// Load commands
client.commands = new Collection();
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(pathToFileURL(filePath));
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

// Discord bot events
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Register slash commands
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');

        const commands = [];
        for (const file of commandFiles) {
            const filePath = join(commandsPath, file);
            const command = await import(pathToFileURL(filePath));
            if ('data' in command) {
                commands.push(command.data.toJSON());
            }
        }

        await rest.put(
            Routes.applicationCommands(client.user.id), {
                body: commands
            },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error executing this command!',
            ephemeral: true
        });
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);