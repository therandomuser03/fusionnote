// userModel.ts
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
	name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true
    },
	username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
	email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
	password: {
        type: String,
        required: [true, "Please provide a password"]
    },
	isVerified: {
        type: Boolean,
        default: false
    },
	isAdmin: {
        type: Boolean,
        default: false
    },
    image: { // <-- ADD THIS FIELD!
        type: String,
        default: null // It's good practice to set a default, like null or an empty string
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User