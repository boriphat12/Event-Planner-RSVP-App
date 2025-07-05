import express from 'express'
import { register, login } from '../controllers/authController'
import { authenticationToken } from '../middleware/authMiddleware';
import User from '../models/User';

const router = express.Router();

router.get('/me', authenticationToken, async (req, res) => {
    try{
        const user = await User.findById(req.userId).select('-password');
        if(!user) {
            res.status(404).json({error: 'User not found'});
            return;
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
})
router.post('/register', register);
router.post('/login', login);

export default router;