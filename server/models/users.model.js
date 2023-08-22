import mongoose from 'mongoose';

const webUser = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true}

}, {
    timestamps: true,
});

const WebUser = mongoose.model('WebUser', webUser);

export default WebUser;