import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  DOB: {
    type: Date,
    required: [true, 'Date of Birth is requires'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female'],
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landMark: { type: String },
    country: { type: String, required: true },
  },
  profilePic: { type: String },
})

const User = mongoose.model('User', UserSchema)

export default User
