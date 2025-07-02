import mongoose, { mongo } from "mongoose";

const rsvpSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true}
}, {timestamps: true});

rsvpSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
});

export default mongoose.model('RSVP', rsvpSchema);