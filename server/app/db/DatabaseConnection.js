const mongoose = require("mongoose");
require('dotenv').config();


// singleton class
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    this.connection = null;
    DatabaseConnection.instance = this;
  }

  async createConnection() {
    try {
      console.log(process.env.DB_URI);
      this.connection = await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to the database");
    } catch (err) {
      console.log("Cannot connect to the database", err);
      process.exit();
    }
  }
}

module.exports = DatabaseConnection;
