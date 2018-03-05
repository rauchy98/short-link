'use strict'

const mongoose = require("mongoose"),
      jwt = require("jsonwebtoken"),
      config = require("../config"),
      User = mongoose.model('User');


exports.login = async (req, res) => {
    if (req.body.username && req.body.password) {
        try {
            const user = await User.authenticate(req.body.username, req.body.password);
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: "5 days"
            });
            res.json({ auth: true, token: token });
        } catch(err) { res.status(401).send(err.message); }
    }
}

exports.register = async(req, res) => {

    if (req.body.password !== req.body.passwordConf) {
        return res.status(400).json({ error: 'Passwords do not match.' })
      }

    if (req.body.email 
        && req.body.username
        && req.body.password
        && req.body.passwordConf) {

        const userData = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          passwordConf: req.body.passwordConf,
        }

        try {
            const user = await User.create(userData);
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: "5 days"
            });
            res.json({ auth: true, token: token });
        } catch(err) { throw err; res.send(err); }
    }
};

exports.check = (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
        res.status(200).send(decoded);
    });
};