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
    console.log('Shorten command triggered with URL:', url);

    try {
        const response = await fetch(`${process.env.BACKEND_API_URL}/url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url
            }),
        });

        console.log('Backend response status:', response.status);

        const data = await response.json();
        console.log('Backend response data:', data);

        if (response.ok) {
            const shortUrl = `${process.env.BACKEND_API_URL}/url/${data.id}`;
            await interaction.reply(`Here's your shortened URL: ${shortUrl}`);
        } else {
            await interaction.reply('Failed to shorten URL. Please try again.');
        }
    } catch (error) {
        console.error('Error shortening URL:', error);
        await interaction.reply('An error occurred while shortening the URL.');
    }
}