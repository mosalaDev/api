const nodemailer = require("nodemailer");
const Email = require("email-templates");
const { google } = require("googleapis");

const CLIENT_ID = process.env.OAUTH_CLIENTID,
	CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET,
	REDIRECT_URI = process.env.OAUTH_REDIRECT_URI,
	REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN,
    CLIENT_EMAIL = process.env.MAIL_USERNAME;

const OAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = async () => {
    // Generate the accessToken on the fly
	const accessToken = await OAuth2Client.getAccessToken();

	// Create the email envelope (transport)
	const transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: CLIENT_EMAIL,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN,
			accessToken: accessToken,
		},
	});

	const email = new Email({
		message: {
			from: "mosalamaboko2021@gmail.com",
		},
		// uncomment below to send emails in development/test env:
		send: true,
		transport: transport,
	});

	return email;
};


// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN
//     }
// });
