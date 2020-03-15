const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));

// connection
const dbContext = require('./src/models/mongooseDb.js');
dbContext.mongoose
    .connect(dbContext.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        (connectSuccessMessage = () => {
            console.log('Has connected to the database.');
        })
    )
    .catch(
        (connectFailedMessage = err => {
            console.log('Cannot connect to the database. ', err);
            process.exit;
        })
    );

// content-type:
//// application/json
app.use(bodyParser.json());
//// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (request, response) => {
    response.json({ message: 'Welcome to the NodeJS world' });
});

// Routes
require('./src/routes/tutorial.route')(app);
// Set PORT, list for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
