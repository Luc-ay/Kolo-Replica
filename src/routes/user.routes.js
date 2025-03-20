import express from 'express'
import verifyToken from '../middleware/auth.middleware.js'
import { phoneVerification } from '../controllers/user.controller.js'

const router = express.Router()

// Routes

router.post('/profile', verifyToken, updateUser)
router.post('/profile', verifyToken, phoneVerification)

export default router
