import express from 'express'
import { registerAuth, loginAuth } from '../controllers/auth.controller.js'
import asyncWrapper from '../middleware/asyncWrapper.js'

const router = express.Router()

// Routes
router.post('/register', registerAuth)
router.post('/login', loginAuth)

export default router
