'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '1622e06d8c6c7f429c00e98ecd26ff4a',
    channelAccessToken: '4ZdpR9ani2nxy4ERRvMGQA7RYuiejjYrnTrDF4430ZWLL4KTPEI9W2hAIHbVf0CYs/n3TU7oJ/TMQwsiEytEvVEvuDCYBPlpDMbZwMkJngLmexxtPS4Tq0AWkwIgjELdGF0mRRkTm6N/ErN+Iyd96wdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!'));
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
