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
        enum: {
            values :['stade', 'salle', 'openAir', 'secret'],
            message: 'Type is either: stade, salle, openAir or secret'
    }},
    capacity: {
        type: Number,
        required: [true, 'A venue must have a capacity'],
        /// ci dessous custom validator
        validate: {
            validator: function(val) {
                console.log (val);
                return val > 99;
            },
            message: 'Capacity must be more than 99'
        },
    },
    secretVenue: {
        type: Boolean,
        default:false,
    } 
})

// Aggregation middleware
venueSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretVenue: {$ne:true }}})
    next();
})

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue; 