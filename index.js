const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const dotenv = require('dotenv');

// Telegram Bot Token
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

// OpenAI API Key
const openaiApiKey = process.env.OPENAI_API_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// OpenAI Query Function
async function getOpenAIResponse(query) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [{ "role": "user", "content": query }],
                "temperature": 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('OpenAI Response:', response.data);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Hi! I'm your Information Retrieval Bot Raju. Send me a query!");
});

// Handle /help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "I can help you find information. Just send me a query.");
});

// Handle incoming messages
bot.on('message', async (msg) => {
    if (msg.text === '/start' || msg.text === '/help') return;
    const chatId = msg.chat.id;
    const userQuery = msg.text;
    const openaiResponse = await getOpenAIResponse(userQuery);
    bot.sendMessage(chatId, openaiResponse);
});
