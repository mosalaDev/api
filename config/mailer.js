const nodemailer = require('nodemailer');
const Email = require('email-templates');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

const email = new Email({
    message: {
        from: 'samkin1997@gmail.com'
    },
    // uncomment below to send emails in development/test env:
    // send: true,
    transport: transporter
});


module.exports = email;