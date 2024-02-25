import mongoose, {Schema} from 'mongoose';

const takerSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    comment: { type: String},
    location: {
        latitude: { type: Number, required: false },  // will make it required after adding sana's code
        longitude: { type: Number, required: false }
    }
});

const Taker = mongoose.models.taker || mongoose.model('taker', takerSchema);

export default Taker;
