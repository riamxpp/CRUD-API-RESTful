const express = require('express');
const router = require('./routes/index.js');

const app = express();

app.use(express.json());

app.use(router)

app.listen(3500, () => {
    console.log("Running server")
})