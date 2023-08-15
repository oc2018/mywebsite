import mongoose from "mongoose";
import Message from "../models/messages.model.js";

export const getMessage = async (req, res) => {
    const {id: _id} = req.params;

    try {
        const data = await Message.findById(_id);
        
        res.status(200).send(data);
    } catch (error) {
       console.log(error);
       res.status(500).send({ message: error.message}); 
    }
}

export const getMessages = async(req, res) => {
    try {
        const data = await Message.find();

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
}

export const createMsg = async(req, res) => {
    const data = req.body;
    
     try {
        const newMsg = new Message(data);
        await newMsg.save();

        res.status(201).send( newMsg );

     } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
     }
}

export const updateMsg = async(req, res) => {
    const { id: _id } = req.params;
    const data = req.body;
    
     try {
        if (!mongoose.Types.ObjectId.isValid( _id)) return res.status(404).send({ error: 'Invalid id' });
         const isExistingMsg = await Message.findOne({_id});
         if(!isExistingMsg  ) return res.status(404).send({ error: 'Message not found'});
         const updatedMsg = await Message.findByIdAndUpdate(_id,{ ...data}, { new: true });

         res.status(200).send(updatedMsg);
     } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
     }
}

export const deleteMsg = async(req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid( _id)) return res.status(404).send({ error: 'Invalid id' });
    const isExistingMsg = await Message.findOne({_id});
    if(!isExistingMsg  ) return res.status(404).send({ error: 'Message not found'});

    try {
        await Message.findByIdAndDelete(_id);
        
        res.status(200).send({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Message not found' });   
    }
    
}