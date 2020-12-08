const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(morgan('tiny'));

// API
const users = require('./routes/usersRoutes');
app.use(users);

// Always include this grouping in a MERN application
// =============================================================================
if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
// =============================================================================

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/users",
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