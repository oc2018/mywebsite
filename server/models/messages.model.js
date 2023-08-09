import mongoose from 'mongoose';

const msgSchema = mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true }
},{
    timestamps: true
})

const Message = mongoose.model('MsgSchema', msgSchema);

export default Message;