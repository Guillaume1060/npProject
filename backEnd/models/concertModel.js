const mongoose = require('mongoose');


const concertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A concert must have a name'],
        unique: true,
        trim: true
    },
    artist: {
        type: String,
        required: [true, 'A concert must have an artist'],
    },
    date: {
        type: Date,
        required: [true, 'A concert must have a date'],
    },
    venue: {
        type: String,
        required: [true, 'A concert must have a venue'],
    },
})

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert; 