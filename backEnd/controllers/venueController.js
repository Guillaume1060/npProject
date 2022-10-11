const { Query } = require('mongoose');
const Venue = require('../models/venueModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllVenues = async (req, res) => {
    try {
        const features = new APIFeatures(Venue.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const venues = await features.query;


        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: venues.length,
            data: {
                venues
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getVenue = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        // equal to :  Concert.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                venue
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};


exports.createVenue = async (req, res) => {
    try {
        const newVenue = await Venue.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newVenue
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.updateVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            data: {
                venue
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};


exports.deleteVenue = async (req, res) => {
    try {
        await Venue.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};


exports.getVenueStats = async (req, res) => {
    try {
        const stats = await Venue.aggregate([
            {
                $match: { capacity: { $gte: 500 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$location' },
                    Venues: { $sum: 1 },
                    totalCapacity: { $sum: '$capacity' },
                    // avgCapacity: { $avg: '$capacityAverage' },
                    minCapnumacity: { $min: '$capacity' },
                    maxCapacity: { $max: '$capacity' },
                    // avgPrice: { $avg: '$price' },
                }
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}