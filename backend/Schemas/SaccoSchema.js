import mongoose from 'mongoose';

const SaccoSchema = new mongoose.Schema({
    saccoName: {
        type: String,
        required:true,
        unique:true
    },
    saccoLocation: {
        type: String,
        required: true
    },
    operationPeriod: {
        type: String,
        required: true
    },
    member: [{
        type: String,
        ref: 'Member' // Assuming Member model exists
    }],
});

const SaccoModel = mongoose.model('Sacco', SaccoSchema);

export default SaccoModel;