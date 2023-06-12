require('dotenv').config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const DatabaseConnection = require("./db/DatabaseConnection");
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const connection = new DatabaseConnection();
connection.createConnection();

console.log(process.env.DB_URI);
const port = process.env.PORT || 3001;
const mongoURI = process.env.DB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });
