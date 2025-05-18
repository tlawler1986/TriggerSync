const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ammoSchema = new Schema({
    "9mm": {
        type: Number,
        default: 0, 
    },
    "40": {  
        type: Number,
        default: 0, 
    },
    "223_556": {  
        type: Number,
        default: 0, 
    },
    "308_762": {
        type: Number,
        default: 0, 
    },
    "22LR": {
        type: Number,
        default: 0, 
    },
    "12Gauge": {
        type: Number,
        default: 0, 
    },
    "6_5Creedmoor": {
        type: Number,
        default: 0, 
    },
    "300WinMag": {
        type: Number,
        default: 0, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });



module.exports = mongoose.model('Ammo', ammoSchema);