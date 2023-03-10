const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Here we define the schema for the global settings of the application

const settingsSchema = new Schema({
  // Number of items to display per page
  popularCryptos: {
    type: Number,
    required: true,
    default: 10
  },
  popularRss: {
    type: Number,
    required: true,
    default: 10
  }
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;

