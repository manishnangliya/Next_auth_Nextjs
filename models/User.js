import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false }
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model.User || mongoose.model('User', userSchema)
