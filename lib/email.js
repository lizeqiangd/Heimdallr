(function() {
    'use strict';
    var nodemailer = require("nodemailer");

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
        to: "lixinyang920304@gmail.com", // list of receivers
        subject: "Test Mail", // Subject line
        text: "Hello! Thank you for using this monitoring system", // plaintext body
        html: "<b>Hello! Thank you for using this monitoring system</b>" // html body
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log(mailOptions);
            console.log("From: " + mailOptions['from']);
            console.log("To: " + mailOption['to']);
            console.log("Message sent: " + response.message);
        }
        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
})();


