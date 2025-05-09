import {
    SlashCommandBuilder
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('shorten')
    .setDescription('Shorten a URL')
    .addStringOption(option =>
        option.setName('url')
        .setDescription('The URL to shorten')
        .setRequired(true));

export async function execute(interaction) {
    const url = interaction.options.getString('url');

    try {
        const response = await fetch('https://discordbot-production-45f7.up.railway.app/url', {
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
            const shortUrl = `https://discordbot-production-45f7.up.railway.app/url/${data.id}`;
            await interaction.reply(`Here's your shortened URL: ${shortUrl}`);
        } else {
            await interaction.reply('Failed to shorten URL. Please try again.');
        }
    } catch (error) {
        console.error('Error shortening URL:', error);
        await interaction.reply('An error occurred while shortening the URL.');
    }
}