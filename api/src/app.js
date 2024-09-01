const express = require('express');
const router = require('./routes/index.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(router)

app.listen(3500, () => {
    console.log("Running server")
})