import {
    SlashCommandBuilder
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('qrcode')
    .setDescription('Generate a QR code for a URL')
    .addStringOption(option =>
        option.setName('url')
        .setDescription('The URL to generate a QR code for')
        .setRequired(true)
    );

export async function execute(interaction) {
    const url = interaction.options.getString('url');
    // Your QR code generation logic here
    await interaction.reply('QR code feature coming soon!');
}