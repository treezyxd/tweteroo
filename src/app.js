import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  if (typeof username != "string" || typeof avatar != "string" || !username || !avatar) {
    res.status(400).send('Todos os campos sao obrigatorios!');
    return;
  }

  const newUser = {
    username,
    avatar
  }

  users.push(newUser);
  
  res.status(201).send('OK');
})

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;

  if (typeof username != 'string' || typeof tweet != 'string' ||  !username || !tweet) {
    res.status(400).send('Todos os campos sao obrigatorios');
    return;
  }

  const userAuthorized = users.find(user => user.username === username);

  if (!userAuthorized) {
    return res.status(401).send('UNAUTHORIZED');
  }

  const newTweet = {
    username,
    tweet
  }

  tweets.push(newTweet);

  res.status(201).send('OK');
})

app.get('/tweets', (req, res) => {
  const lastTweets = tweets.slice(-10);

  if (tweets.length === 0) {
    return res.send([]);
  }

  const getTweets = lastTweets.map(t => {
    const user = users.find(u => u.username === t.username);

    return {
      username: user.username,
      avatar: user.avatar,
      tweet: t.tweet
    };
  });

  res.status(200).send(getTweets);
})

const PORT = 5000;
app.listen(PORT, ()=>console.log(`server running at port ${PORT}`));