const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('It works!');
});

// Sign up
router.post('/auth/signup/', passport.authenticate('signup', {session: false}),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

// Login
router.post('/auth/login/', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          console.log(err);
          const error = new Error('An Error occurred');
          return next(error);
        }
        req.login(user, {session: false}, async (error) => {
            if (error) return next(error);
            return res.json({token: user.generateJWT()});
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});


module.exports = router;