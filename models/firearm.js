const mongoose = require('mongoose');
const { Schema } = mongoose;

const firearmSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
    },
    caliber: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        },
    purchasePrice: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['handgun', 'semi-automatic', 'shotgun', 'bolt-action', 'lever-action', 'other'],
        required: true,
    },
}, { timestamps: true }); 

module.exports = mongoose.model('Firearm', firearmSchema);
