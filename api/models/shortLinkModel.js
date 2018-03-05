'use strict'

const mongoose = require('mongoose'),
      autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection('mongodb://localhost/Linksdb');

autoIncrement.initialize(connection);

const LinkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shortLink: {
        type: String
    },
    pageTitle: {
        type: String
    },
    pageDescription: {
        type: String
    },
    pageImage: {
        type: String
    },
    clicks: {
        type: Number
    }
});

LinkSchema.plugin(autoIncrement.plugin, {
    model: 'Links',
    field: '_id',
    startAt: 10000,
    incrementBy: 1
});

module.exports = mongoose.model('Links', LinkSchema);