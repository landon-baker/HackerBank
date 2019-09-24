require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { userMethods, txMethods } = require('./db/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/users', async (req, res) => {
  const results = await userMethods.findUser({ name: req.query.name });
  res.status(200).send(results);
});

app.post('/api/users', async (req, res) => {
  const { name, password } = req.body;
  const results = await userMethods.addUser({
    name,
    password,
    balance: 0
  });
  res.status(201).send(results);
});

app.post('/api/transactions', async (req, res) => {
  const { type, name, amount } = req.body;
  await txMethods.withdrawalOrDeposit({ type, name, amount });
  res.status(201).send();
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
