const jwt = require('jsonwebtoken');
SECRET_KEY = 'secret'; //placeholder

function authToken(req, res, next) {
    try {
        const token = req.headers.authorization;//change?
        if(token) {
            const payload = jwt.verify(submittedToken, SECRET_KEY);
            req.user = payload;
        }
        return next();
    } catch(err) {
        return next(err);
    }
}

//add function to make sure if user is logged in?

module.exports = {authToken};