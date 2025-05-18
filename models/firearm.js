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
        required: true,
    },
    caliber: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['handgun', 'rifle', 'shotgun'],
        required: true,
    },
}, { timestamps: true }); 

module.exports = mongoose.model('Firearm', firearmSchema);
