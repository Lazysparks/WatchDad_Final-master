/**
 * Created by Jack on 5/29/2016.
 */

var mailer = require('nodemailer');

var smtpOptions = {
    service: "gmail",
    auth: {
        user: "watchdadteam2@gmail.com",
        pass: "wachtwoord123"
    }};

var smtpTransport = mailer.createTransport("SMTP", smtpOptions);
    
exports.sendRegistrationMail = function(user){
    smtpTransport.sendMail({
        from: "watchdadteam2@gmail.com",
        to: user.email,
        subject: "Welkom bij WatchDad",
        text: "Beste " + user.fullName + "!  \n\nWelkom bij de beta versie van WatchDad! Super dat jij ons wil helpen met het realiseren van een goed werkende webapplicatie! Met als doel om ouderen te helpen in het dagelijks leven. U bent een van de eerste personen die mag toetreden op deze website. \n\n\nU kunt nu starten met het toevoegen van profielen en camera’s. Daarnaast kan u deze profielen en camera’s ook naar uw eigen behoefte instellen. \n\nMocht u contact willen met onze helpdesk in verband met technische vragen, mail dan naar Watchdadteam2@gmail.com Wij zullen hier binnen 24 uur op reageren.  \n\n\nMet vriendelijke groet, \nJack Jasper Thomas van WatchDad! "
    }, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Mail sent: " + response.message);
        }
    });
};