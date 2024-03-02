const axios = require('axios');
const express = require('express');
const app = express();
const { Telegraf } = require('telegraf');

const dotenv = require('dotenv');


app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Telegram Bot Token
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(token);
// console.log(bot)

// OpenAI API Key
const openaiApiKey = process.env.OPENAI_API_KEY;


// OpenAI Query Function
async function getOpenAIResponse(query) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [{ "role": "system", "content": "Your name is Raju and You are very friendly in nature" }, { "role": "user", "content": query }],
                "temperature": 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}

// Handle /start command
bot.start((ctx) => ctx.reply('Welcome! I am your Information Retrieval Bot Raju. Send me a query!'));

// Handle /help command
bot.help((ctx) => ctx.reply('I can help you find information. Just send me a query.'));

// Handle /joke command
bot.command('joke', async (ctx) => {

    const response = await getOpenAIResponse("Tell me a random joke")
    ctx.reply(response);
});

bot.on('text', async (ctx) => {
    const query = ctx.message.text;
    const response = await getOpenAIResponse(query);
    ctx.reply(response);
});


bot.launch();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
