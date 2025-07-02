import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    date: {type: Date, required: true},
    location: {type: String},
    isPublic: {type: Boolean, default: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

eventSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
});

export default mongoose.model('Event', eventSchema);