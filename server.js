const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API
const users = require('./api/users');
app.use(users);

// app.use(express.static(path.join(__dirname, '/client/build')))
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
  }
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build'));
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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});