import mongoose, {Schema} from 'mongoose';

const giverSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true }
});

const Giver = mongoose.models.giver || mongoose.model('giver', giverSchema);

export default Giver;
