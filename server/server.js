require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/example', (req, res) => {
  res.status(200).send('you hit the example route');
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
