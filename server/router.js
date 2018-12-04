const Authentication  = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// middleware for each request at a specific route, session: false is because the default behavior is to treat the session as a cookie-based session
const requireAuth = passport.authenticate('jwt', {session:false});

module.exports = function(app) {
     app.get('/', requireAuth, function(req, res){
          res.send({hi:'there'});
     })
     app.post('/signup', Authentication.signup);
}