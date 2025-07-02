import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({error: "Email already in use"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword});

        const savedUser = await user.save();
        res.status(201).json({message: 'User created', id: savedUser._id})
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
};

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({error: 'Invalid email or password'});
            return;
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if(!passwordCorrect) res.status(401).json({error: 'Invalid email or password'})
        
        const token = jwt.sign({id: user._id, email: user.email}, JWT_SECRET, {
            expiresIn: '7d',
        });
        res.json({token, name: user.name, email: user.email});
    } catch (error){
        res.status(500).json({error: 'Something went wrong'});
    };
}