// const TelegramBot = require('node-telegram-bot-api');
// const axios = require('axios');
// const express = require('express');
// const app = express();

// const dotenv = require('dotenv');




// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


// // Telegram Bot Token
// dotenv.config();

// const token = process.env.TELEGRAM_BOT_TOKEN;

// // OpenAI API Key
// const openaiApiKey = process.env.OPENAI_API_KEY;

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, { polling: true });

// // OpenAI Query Function
// async function getOpenAIResponse(query) {
//     try {
//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',
//             {
//                 "model": "gpt-3.5-turbo",
//                 "messages": [{ "role": "system", "content": "Your name is Raju and You are very friendly in nature" }, { "role": "user", "content": query }],
//                 "temperature": 0.7
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${openaiApiKey}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data.choices[0].message.content;
//     } catch (error) {
//         console.error('OpenAI Error:', error);
//         return 'Sorry, I encountered an error while processing your request.';
//     }
// }

// // Handle /start command
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, "Hi! I'm your Information Retrieval Bot Raju. Send me a query!");
// });

// // Handle /help command
// bot.onText(/\/help/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, "I can help you find information. Just send me a query.");
// });


// // Handle incoming messages
// bot.on('message', async (msg) => {
//     if (msg.text === '/start' || msg.text === '/help') {
//         return;
//     }
//     const chatId = msg.chat.id;
//     const userQuery = msg.text;
//     if (userQuery === '/joke') {
//         const jokes = await getOpenAIResponse('Tell me a random joke');
//         bot.sendMessage(chatId, jokes);
//         return;
//     }
//     const openaiResponse = await getOpenAIResponse(userQuery);
//     bot.sendMessage(chatId, openaiResponse);
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });