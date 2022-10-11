const Artist = require('../models/artistModel');

exports.getAllArtists = async (req, res) => {
    try {
        // BUILD A QUERY
        // 1A) Filtering
        const queryObject = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObject[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // { difficulty: 'easy' , duration: { $gte: 5 } }   => mongoose requete necessaire
        // { difficulty: 'easy', 'duration[gte}': '5' }     => console.log(req.query);
        // donc ci dessus on a ajouté le $ à queryStr
        let query = Artist.find(JSON.parse(queryStr));

        // 2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
            // sort('price Rating')
        } else {
            query = query.sort('-createdAt');
        }


        // EXECUTE QUERY
        const artists = await query;

        // const query = Tour.find()
        // .where('duration')
        // .equals(5)
        // .where('difficulty')
        // .equals('easy');

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: artists.length,
            data: {
                artists
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        // equal to :  Concert.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                artist
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};


exports.createArtist = async (req, res) => {
    try {
        const newArtist = await Artist.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                artist: newArtist
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            data: {
                artist
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};


exports.deleteArtist = async (req, res) => {
    try {
        await Artist.findByIdAndDelete(req.params.id);

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
