import WebUser from "../models/users.model.js";
import Jwt from 'jsonwebtoken';
import Bcrypt from'bcryptjs';
import env from 'dotenv';
import mongoose from "mongoose";

env.config();

const secret = process.env.SECRET;

// console.log(secret)
//get one user

export const getUser = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const user = await WebUser.findOne({ _id });
        // console.log({ user: user})

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

//get all users

export const getUsers = async(req, res) => {
    try {
        const users = await WebUser.find();

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// create a new user and add it to the database

export const createUser = async(req, res) => {
    const { name, password, email, confirmPassword } = req.body;

    try {
        const isExistingUser = await WebUser.findOne({ email });     
        if(isExistingUser) return res.status(404).send({ message: 'User already exists' });
        
        if( password !== confirmPassword ) return res.status(403).send({ message: 'Passwords do not match'});
        const encryptedPassword = await Bcrypt.hash( password, 12);

        const newUser  = await WebUser.create({ name, email, password: encryptedPassword });
        const token = Jwt.sign({ userId: newUser._id, name: newUser.name, email: newUser.email}, secret, { expiresIn: '1h' })
        res.status(200).send({ user: { email: newUser.email, name: newUser.name } ,token });
        // console.log(userData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const authenticateUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const isExistingUser = await WebUser.findOne({ email: email});
        if(!isExistingUser) return res.status(403).send({ message: 'Not a user, please sign up'});

        const isValidPassword = await Bcrypt.compare(password, isExistingUser.password );

        if(!isValidPassword) return res.status(403).send({ message: 'Password is not correct' });

        const token = Jwt.sign({ userId: isExistingUser._id, name: isExistingUser.name, email: isExistingUser.email }, secret, { expiresIn: '1h'});

        res.status(200).send({ user: { id: isExistingUser._id, name: isExistingUser.name, email: isExistingUser.email}, token});
    } catch (error) {
        res.status(500).send({ message: error.message });
    };
};

export const updateUser = async(req, res) => {
    const { id: _id } = req.params;
    const { name, password, newPassword, email } = req.body;

    try {
        const isExistingUser = await WebUser.findOne({ _id });

        if (!isExistingUser) return res.status(404).send({ message: 'User not found' });
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message: 'invalid_id' });

        const isPasswordCorrect = await Bcrypt.compare( password, isExistingUser.password);
        if(!isPasswordCorrect) return res.status(403).send({ message: 'last password is incorrect' });
        const newEncryptedPassword = await Bcrypt.hash(newPassword, 12);

        const updatedUser = await WebUser.findByIdAndUpdate(_id, { name, email, password: newEncryptedPassword }, { new: true });

        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(404).send({ message: error.message });
    };

};

// delete user

export const deleteUser = async(req, res) => {
    const { id: _id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message: `User ${_id} is not a valid user` });
        const isExistingUser = await WebUser.findOne({ _id });
        if(!isExistingUser) return res.status(404).send({ message: `User ${_id} is not a valid user` });

        await WebUser.findByIdAndDelete(_id);

        res.status(200).send({ message: `User ${_id} has been deleted successfully.` });

    } catch (error) {
        res.status(500).send({ message: error.message });
    };
};