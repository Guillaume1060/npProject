const mongoose = require('mongoose');


const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A venue must have a name'],
        unique: true,
        trim: true
    },
    location: {
        type: String,
        required: [true, 'A venue must have a location'],
        trim: true
    },
    type: {
        type: String,
        required: false,
    },
    capacity: {
        type: Number,
        required: [true, 'A venue must have a capacity'],
    },
})

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue; 