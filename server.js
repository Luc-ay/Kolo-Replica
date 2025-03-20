import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import session from 'express-session'
import passport from './src/config/passport.js'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/auth.route.js'
import userRoutes from './src/routes/user.route.js'
import notFound from './src/middleware/notFound.middleware.js'
import errorHandler from './src/middleware/errorHandler.middleware.js'
dotenv.config()

const app = express()
connectDB()
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(limiter)
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
)
app.use(compression())
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.get('/', (req, res) => {
  res.send(`We are online`)
})
app.use('/oauth', authRoutes)
app.use('/app/account', userRoutes)

// Error Handlers
app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`)
})
