import mongoose from 'mongoose';
import validator from 'validator';

const webUser = mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid Email.']
    },
    password: { 
        type: String, 
        required: true,
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [128, 'Password must be at most 128 characters long.']
    }

}, {
    timestamps: true,
});

const WebUser = mongoose.model('WebUser', webUser);

export default WebUser;