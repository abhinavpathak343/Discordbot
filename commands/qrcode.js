import {
    SlashCommandBuilder
} from 'discord.js';
import QRCode from 'qrcode';

export const data = new SlashCommandBuilder()
    .setName('qrcode')
    .setDescription('Generate a QR code for a URL')
    .addStringOption(option =>
        option.setName('url')
        .setDescription('The URL to generate a QR code for')
        .setRequired(true)
    );

export async function execute(interaction) {
    try {
        const url = interaction.options.getString('url');

        // Generate QR code as data URL
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 400
        });

        // Convert data URL to buffer
        const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');

        // Send the QR code as an image
        await interaction.reply({
            content: `Here's the QR code for ${url}:`,
            files: [{
                attachment: qrCodeBuffer,
                name: 'qrcode.png'
            }]
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        await interaction.reply({
            content: 'Sorry, there was an error generating the QR code. Please make sure the URL is valid.',
            ephemeral: true
        });
    }
}