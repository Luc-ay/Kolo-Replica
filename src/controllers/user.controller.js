import twilio from 'twilio'
import User from '../model/auth.model.js'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const phoneVerification = async (req, res) => {
  const { phoneNumber, code } = req.body
  const userId = req.user.id // Get userId from JWT middleware

  try {
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    // If phone number is already verified, deny changes
    if (user.isPhoneVerified) {
      return res.status(400).json({
        message: 'Phone number is already verified and cannot be changed.',
      })
    }

    // Send OTP if no code is provided
    if (!code) {
      await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({ to: phoneNumber, channel: 'sms' })
      return res.json({ message: 'Verification code sent!' })
    }

    // Verify OTP
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phoneNumber, code })

    if (verificationCheck.status !== 'approved') {
      return res.status(400).json({ message: 'Invalid verification code' })
    }

    // Update user profile (One-time update)
    await User.findByIdAndUpdate(userId, { phoneNumber, isPhoneVerified: true })

    res.json({ message: 'Phone number verified and saved permanently!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error processing request', error: error.message })
  }
}
