'use strict'

const mongoose = require('mongoose'),
    Link = mongoose.model('Links'),
    shortener = require('../shortener'),
    urlMetadata = require('url-metadata');

exports.list_all_links = async (req, res) => {

    try {
        const links = await Link.find({userId: req.userId}).exec();
        res.json(links);
    } catch(err) { res.send(err.message); }

};

exports.add_link = async (req, res) => {

    const body_link = new Link(req.body);
    const link = await body_link.save();
    const metadata = await urlMetadata(req.body.link);

    try {
        let new_link = await Link.findById(link._id).exec();
    
        new_link.shortLink = shortener.encode(link._id);
        new_link.userId = req.userId;
        new_link.pageTitle = metadata.title;
        new_link.pageDescription = metadata.description;
        new_link.pageImage = metadata.image;
        new_link.clicks = 0;
        new_link.save();

        res.json(new_link);
    } catch(err) { res.send(err.message); }

};

exports.delete_link = async (req, res) => {

    try {
        const link = await Link.findByIdAndRemove(req.params.linkId).exec();
        res.json({ message: 'Link successfully deleted' });
    } catch(err) { res.send(err.message); }

};

exports.get_long_url = async (req, res) => {

    try {
        const id = shortener.decode(req.params.shortLink);
        let link = await Link.findById(id).exec();

        link.clicks++;
        link.save();

        res.redirect(link.link);
        res.end();
    } catch(err) { res.send(err.message); }

};

exports.get_short_link = async (req, res) => {
    try {
        const link = await Link.findById(req.params.linkId).exec();
        res.send(link.shortLink);
    } catch(err) { res.send(err.message); }
};