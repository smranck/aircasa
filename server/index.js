const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routers = require('./routers.js');

const app = express();
const PORT = process.env.PORT || 3000;

app
  .use(express.static(path.join(__dirname, '/../client/dist/')))
  .use(bodyParser.json())
  .use(routers)
  .listen(PORT, () => console.log(`listening on ${PORT}`));
