/**
 * Created by Jack on 6/3/2016.
 */

var schedule = require('node-schedule'),
    User = require('mongoose').model('User');

module.exports = schedule.scheduleJob('*/5 * * * * *', function () {

    User.find({}, '-password -salt',
        function (err, profiles) {
            for (var i = 0; i < profiles.length; i++) {
                console.log(JSON.stringify(profiles[i], null, '\t'));
            }
        }
    );
});