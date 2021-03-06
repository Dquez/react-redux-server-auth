const Authentication = require('./controllers/authentication');
require('./services/passport');
const passport = require('passport');

// cors setup
const cors = require('cors');
const corsOptions = require('./index').corsOptions

// middleware for each request at a specific route, session: false is because the default behavior is to treat the session as a cookie-based session
const requireAuth = passport.authenticate('jwt', {
     session: false
});
const requireSignin = passport.authenticate('local', {
     session: false
});

module.exports = function (app) {
     app.get('/', requireAuth, function (req, res) {
          res.send({
               hi: 'there'
          });
     })
     app.post('/signup', cors(corsOptions), Authentication.signup);
     app.post('/signin', cors(corsOptions), requireSignin, Authentication.signin);
}