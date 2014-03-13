(function() {
    'use strict';
    var nodemailer = require("nodemailer");

    module.exports = function(tomailadd, topic, content) {
        // create reusable transport method (opens pool of SMTP connections)
        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: "heimdallrmail@gmail.com",
                pass: "user2014"
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: "heimdallrmail@gmail.com", // sender address
            to: tomailadd,// list of receivers
            subject: topic, // Subject line
            text: content, // plaintext body
            //html: "<b>Hello! Thank you for using this monitoring system</b>" // html body
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("From: " + mailOptions['from']);
                console.log("To: " + mailOptions['to']);
                console.log("Message sent: " + response.message);
            }
            // if you don't want to use this transport object anymore, uncomment following line
            smtpTransport.close(); // shut down the connection pool, no more messages
        });
    };
})();


