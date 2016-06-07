'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var cameraSchema = new Schema({
    ip: {type: String, required: true},
    name: {type: String}
});

var profileSchema = new Schema({
    fistName: String,
    lastName: String,
    locations: [{
        name: {type: String},
        cameras: [{type: Schema.ObjectId, rel: 'Camera'}]
    }]    
});

var userSchema = Schema({
    firstName: String,
    lastName: String,
    email: {type: String, match: /.+\@.+\..+/, unique: true},
    password: {
        type: String, validate: function (password) {
            return password && password.length > 6
        }
    },
    salt: String,
    profiles: [{type: Schema.ObjectId, rel: 'Profile'}],
    cameras: [{type: Schema.ObjectId, rel: 'Camera'}],
    created: {type: Date, default: Date.now}
});

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

userSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

userSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('User', userSchema);
mongoose.model('Profile', profileSchema);
mongoose.model('Camera', cameraSchema);