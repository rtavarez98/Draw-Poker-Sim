const jwt = require('jsonwebtoken');
SECRET_KEY = 'secret'; //placeholder

function authToken(req, res, next) {
    try {
        const token = req.headers.authorization;
        if(token) {
            const payload = jwt.verify(submittedToken, SECRET_KEY);
            req.user = payload;
        }
        return next();
    } catch(err) {
        return next(err);
    }
}

module.exports = {authToken};