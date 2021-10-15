const { not_found } = require('./errorObjects');
exports.route_not_found = (req, res, next) => {
    const error = not_found;
    next(error);
};

exports.error_handler = (error, req, res, next) => {
    console.log("error:", error);
    res.status(error.status || 500);

    res.json({
        code: error.code || 'server_error',
        message: error.message || 'Erreur du serveur',
    });
};