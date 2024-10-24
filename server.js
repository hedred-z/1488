const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const BOT_TOKEN = '6760012279:AAHcJueLC_AF49YRK3s-MCc2pTGJy7YZPHA';
const CHAT_ID = '954053674';

app.use(bodyParser.json());
app.use(express.static('public')); // Сделайте папку public доступной для файлов

app.post('/send-data', async (req, res) => {
    const { message } = req.body;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
            }),
        });

        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
