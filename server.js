const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

// API
const users = require('./api/users');
app.use(users);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'));
})

const connection = "mongodb+srv://stovencrantz:Copp3rloon!@cluster0.mwxbg.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});