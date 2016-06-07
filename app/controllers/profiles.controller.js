// /**
//  * Created by Jack on 6/3/2016.
//  */
//
// 'use strict';
//
// var User = require('mongoose').model('userSchema'),
//     passport = require('passport');

var User = require('mongoose').model('User');

// exports.renderProfilesPage = function (req, res, next) {
//     if (req.user) {
//         Profile.find({_userId: req.user.id}, function (err, profiles) {
//             console.log(JSON.stringify(profiles));
//             res.render('profiles', {
//                 title: 'Profielen',
//                 profiles: profiles,
//                 active: {profiles: true},
//                 userFullName: req.user ? req.user.fullName : ''
//             })
//         })
//     } else {
//         return res.redirect('/');
//     }
// };

exports.renderProfilesPage = function(req, res, next){
    if(req.user){
        res.render('profiles');
    }else{
        res.redirect('/');
    }
};

exports.renderProfile = function(req, res, next){
    if(req.user){
        res.render('profile');
    }else{
        res.redirect('/');
    }
}

// exports.renderProfile = function (req, res, next) {
//     if (req.user) {
//         Profile.findOne({_id: req.params.profileId}, function (err, profile) {
//             if (err) res.send(err);
//             console.log(profile);
//             res.render('profile', {
//                 profile: profile,
//                 active: {profiles: true},
//                 userFullName: req.user ? req.user.fullName : ''
//             })
//         })
//     } else {
//         return res.redirect('/');
//     }
// };
//
// exports.createNewProfile = function (req, res, next) {
//     if (req.user) {
//         var profile = new Profile();
//
//         profile.firstName = req.body.firstName;
//         profile.lastName = req.body.lastName;
//         profile._userId = req.user._id;
//
//         profile.save(function (err) {
//             if (err) res.send(err);
//
//             res.redirect('/profile');
//         });
//
//     }
// };
//
// exports.deleteProfile = function (req, res, next) {
//     if (req.user) {
//         var profileId = req.body.profileId;
//         var userId = req.user._id;
//
//         Profile.findOneAndRemove({_id: profileId, _userId: userId}, [], function () {
//             res.redirect('/profile');
//         });
//     } else {
//
//     }
// };
//
// exports.createNewAgendaItem = function (req, res, next) {
//     if (req.user) {
//         var profileId = req.params.profileId;
//         var userId = req.user._id;
//
//         var startTime = req.body.startTime;
//         var endTime = req.body.endTime;
//         var date = req.body.date;
//         var periodical = req.body.periodical;
//
//         console.log(req.body);
//
//         var conditions = {_id: profileId, _userId: userId};
//         var update = {
//             $push: {
//                 agendaItems: {
//                     date: date,
//                     startTime: startTime,
//                     endTime: endTime,
//                     periodic: periodical,
//                     status: 'unchecked'
//                 }}};
//         var options = {multi: false};
//
//         var callback = function(err, affected){
//             if(err) res.send(err);
//             console.log(affected);
//
//             res.redirect('/profile/' + profileId);
//         };
//
//         Profile.update(conditions, update, options, callback);
//     }
// };