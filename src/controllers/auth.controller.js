import passport from 'passport'

exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
})

exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(400).json({ message: 'Authentication failed' })

    req.logIn(user, (err) => {
      if (err) return next(err)
      res.redirect('/dashboard') // Redirect after successful login
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' })
    res.json({ message: 'Logged out successfully' })
  })
}
