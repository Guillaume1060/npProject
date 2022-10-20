const mongoose = require('mongoose');
const slugify = require('slugify');


const concertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A concert must have a name'],
        unique: true,
        trim: true,
        maxLength:[40,'A concert name must be less than 40 characters'],
        minLength:[2,'A concert name must be at least 2 characters'],
    },
    slug: String,  
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
    secretConcert: { 
        type:Boolean,
        default:false,
    },
}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
})

concertSchema.virtual ('ArtistUppercase').get (function(){
    return this.artist.toUpperCase();
});

// Document middleware : runs before the .save() command and .create()
// concertSchema.pre('save', function(next) {
//     this.slug = slugify(this.name, {lower: true});
//     next();
// })

// concertSchema.post('save', function(doc, next) {
//     console.log(doc);
//     next();
// })

// Query middleware
// concertSchema.pre('find', function(next) {
concertSchema.pre(/^find/, function(next) {
    this.find({secretConcert: {$ne: true}})
    this.start = Date.now();
    next();
});

concertSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds`)
    console.log(docs);
    next();
})

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert; 