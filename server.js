'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'baf64668049efd5f9a1e79b1e7ddbe34',
    channelAccessToken: 'KQYjdJjTX6qhegZD+yJzQoU5cAHr8rbRPqUO9/bdfKfnwKkczNIsHThDxjnPl1XYvyRqRd06NcXE03c2mvdOmYC2Bws1Bc3IdrZH8esw7qsfFHWI9eJs8dHA/pDpQO1iLFPENUTWCCOYHqUVQvE9tQdB04t89/1O/w1cDnyilFU='
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