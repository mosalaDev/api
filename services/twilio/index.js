const accountSID = process.env.TWILIO_SID;
const tocken = process.env.TWILIO_AUTH_TOKEN;
const verifySID = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSID, tocken);

exports.sendToken = async (tel) => {
    if (tel) {
        if (tel.toString().indexOf('0') === 0 && tel.toString().length === 10) {
            tel = "+243".concat(tel.toString().slice(1));
        } else if (tel.toString().slice(0, 2) === "00") {
            tel = "+".concat(tel.toString().slice(2));
        } else if (tel.toString()[0] === "8" || tel.toString()[0] === "9") {
            tel = "+243".concat(tel.toString());
        }

        try {
            const data = await client
                .verify
                .services(verifySID)
                .verifications
                .create({
                    to: tel,
                    channel: 'sms'
                });

            return { status: data.status, error: null };
        } catch (err) {
            console.log(err);
            return { status: 'failed', error: err };
        }
    } else {
        return { error: "Mauvais numéro de téléphone.", status: 'failed' };
    }
};

exports.verifyToken = async (tel, code) => {
    if (tel && code) {
        if (tel.toString().indexOf('0') === 0 && tel.toString().length === 10) {
            tel = tel = "+243".concat(tel.toString().slice(1));
        } else if (tel.toString().slice(0, 1) === "00") {
            tel = "+".concat(tel.toString().slice(2));
        } else if (tel.toString()[0] === "8" || tel.toString()[0] === "9") {
            tel = "+243".concat(tel.toString());
        }

        try {
            const data = await client
                .verify
                .services(verifySID)
                .verificationChecks
                .create({
                    to: tel,
                    code: code
                });

            return { error: null, status: data.status };
        } catch (err) {
            return { error: err, status: 'failed' };
        }
    } else {
        return { error: "Mauvais numéro de téléphone.", status: 'failed' };
    }
};