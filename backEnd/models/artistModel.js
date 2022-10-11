const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A artist must have a name'],
        unique: true,
        trim: true
    },
})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist; 