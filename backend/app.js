const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Importing the cors middleware
const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');
const clinicsRoute = require('./routes/clinics');
const appointmentsRoute = require('./routes/appointments');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enabling CORS for all origins
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Healthcare Information Hub API');
});

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);
app.use('/clinics', clinicsRoute);
app.use('/appointments', appointmentsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
