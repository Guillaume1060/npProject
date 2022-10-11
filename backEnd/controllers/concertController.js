const { Query } = require('mongoose');
const Concert = require('../models/concertModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasCarlaTOnly = (req, res, next) => {
    req.query.artist = 'carla T';
    next();
};


exports.getAllConcerts = async (req, res) => {
    try {
        // EXECUTE QUERY (on utilise await ici après avoir effectuer tous les filtres...)
        const features = new APIFeatures(Concert.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const concerts = await features.query;


        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: concerts.length,
            data: {
                concerts
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getConcert = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        // equal to :  Concert.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                concert
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};


exports.createConcert = async (req, res) => {
    try {
        const newConcert = await Concert.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newConcert
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.updateConcert = async (req, res) => {
    try {
        const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            data: {
                concert
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};


exports.deleteConcert = async (req, res) => {
    try {
        await Concert.findByIdAndDelete(req.params.id);

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
