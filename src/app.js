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



const PORT = 5000;
app.listen(PORT, ()=>console.log(`server running at port ${PORT}`));