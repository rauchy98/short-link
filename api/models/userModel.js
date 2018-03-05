'use strict'

const mongoose = require("mongoose"),
      bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    links: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Links'
    }],
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    }
});

UserSchema.statics.authenticate = async (username, password) => {
    const user = await User.findOne({username: username}).exec();

    if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        return Promise.reject(err);
    }

    const result = await bcrypt.compare(password, user.password);

    if (result === true) {
        console.log(user);
        return Promise.resolve(user);
    } else {
        const err = new Error('Passwords are not equal');
        return Promise.reject(err);
    }
}

UserSchema.pre('save', async function(next) {
    const user = this;

    try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
    } catch(err) { return next(err); }

});

const User = mongoose.model('User', UserSchema);
module.exports = User;