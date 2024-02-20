import mongoose, {Schema} from 'mongoose';

const giveRequestSchema = new Schema({
    giverId: { type: mongoose.Schema.Types.ObjectId, ref: 'giver', required: true },
    name: { type: String, required: true },
    givingOrg: { type: String, required: true },
    contact: { type: String, required: true },
    foodType: { type: String, required: true },
    foodServing: { type: Number, required: true },
    availability: { type: String, required: true },
    landmark: { type: String },
    comments: { type: String },
    location: {
        latitude: { type: Number, required: false }, // will make it required after adding sana's code
        longitude: { type: Number, required: false }
    },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
    closedAt: { type: Date },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'taker' }
});

const GiveRequest = mongoose.models.giveRequest || mongoose.model('giveRequest', giveRequestSchema);

export default GiveRequest;
