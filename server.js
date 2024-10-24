const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const BOT_TOKEN = '6760012279:AAHcJueLC_AF49YRK3s-MCc2pTGJy7YZPHA'; // Ваш токен
const CHAT_ID = '954053674'; // Ваш ID пользователя

app.use(bodyParser.json());
app.use(express.static('public')); // Доступ к статическим файлам

app.post('/send-data', async (req, res) => {
    const { message } = req.body;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID, // ID пользователя для отправки
                text: message,
            }),
        });

        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        res.status(500).send({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
