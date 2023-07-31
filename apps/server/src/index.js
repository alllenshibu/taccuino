const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3002
require('dotenv').config();

const router = require('./routes');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to DB")
    }).
    catch((err) => console.log(err));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
