import express from 'express'
import { registerAuth, loginAuth } from '../controllers/auth.controller.js'
import asyncWrapper from '../middleware/asyncWrapper.js'

const router = express.Router()

// Routes
// Google OAuth Login/Register
router.get('/google', googleAuth)

// Google OAuth Callback
router.get('/google/callback', googleCallback)

// Logout Route
router.get('/logout', logout)

export default router
