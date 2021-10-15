const jwt = require('jsonwebtoken');
const secret = "sldjfdsjiufjsnfsdmw94843jfn90jerm,cznc,zvdbvj90wwrjwefnfjkzncw0ofijo4jnewjfndmsczxcnlkfjafw0ofwjkfn2oufndjskfnkcsdckjn"

exports.generateToken = (id) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 2),
        data: { id }
    }, secret);

    return token;
};

exports.verifyToken = (token, cb) => {
    try {
        var decoded = jwt.verify(token, secret);
        cb(null, decoded);
    } catch (err) {
        return cb(err, false);
    }
};

exports.generateAuthToken = ({ id, username }) => {
    const u = { id, username };

    const accessToken = jwt.sign(u, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2d'
    });
    const refreshToken = jwt.sign(u, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '14d'
    });

    return {
        accessToken,
        refreshToken
    };
};