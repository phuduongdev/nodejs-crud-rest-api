const dbConfig = require('../config/mongooseDb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbContext = {
    mongoose: mongoose,
    url: dbConfig.url,
    tutorial: require('./tutorial.model.js')(mongoose)
};

module.exports = dbContext;
