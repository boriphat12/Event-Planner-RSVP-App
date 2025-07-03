import { Request, Response } from 'express';
import express from 'express';
import Event from '../models/Event';
import { AuthenticatedRequest } from '../types/express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try{
        res.status(200).json(await Event.find({}))
    } catch(error) {
        res.status(500).json({error: 'Something error'})
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const event = await Event.findById(id);
        if(!event){
            res.status(400).json({error: 'not find any event'})
            return;
        }
        res.status(200).json(event)
    } catch(error) {
        res.status(500).json({error: 'something went wrong'})
    }
})

router.post('/', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {title, description, date, location, isPublic} = req.body;
        const newEvent = new Event({
            title,
            description, 
            date, 
            location, 
            isPublic, 
            owner: req.userId});
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({error: 'something went wrong'});
    }
})

router.put('/:id', async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {title, description, date, location, isPublic} = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(id, {title, description, date, location, isPublic}, {new: true})
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({error: 'something went wrong'});
    }
})

router.delete('/:id', async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedEvent = await Event.findByIdAndDelete(id);
        res.status(201).json(deletedEvent);
    } catch (error) {
        res.status(500).json({error: 'something went wrong'});
    }
})

export default router;