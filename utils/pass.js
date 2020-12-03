'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username];
    try {
      const [user] = await userModel.getUserLogin(params);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        return done(null, false, { message: 'Incorrect credentials.' });
      }
      // TODO: use bcrypt to check if passwords don't match
      if ((password != user.password)) {
        console.log('Password Not Matching');
        return done(null, false);
      }
      return done(null, { ...user }, { message: 'Logged In Successfully' }); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    }
  })
);

// TODO: JWT strategy for handling bearer token
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, done) => {
      try {
        console.log('util pass JWT', jwtPayload);
        if (jwtPayload === undefined) {
          return done(null, false, { message: 'incorrect id' });
        }
        return done(
          null,
          { ...jwtPayload },
          { message: 'logged in successfully' }
        );
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
