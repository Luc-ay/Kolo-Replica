import User from '../model/auth.model.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id })

        if (!user) {
          user = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          })

          await user.save()
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '2h',
        })

        return done(null, { user, token })
      } catch (error) {
        return done(error, null)
      }
    }
  )
)
