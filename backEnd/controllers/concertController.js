const Concert = require('../models/concertModel');

exports.getAllConcerts = async (req, res) => {
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
        let query = Concert.find(JSON.parse(queryStr));

        // 2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
            // sort('price Rating')
        } else {
            query = query.sort('-createdAt');
        }


        // EXECUTE QUERY
        const concerts = await query;

        // const query = Tour.find()
        // .where('duration')
        // .equals(5)
        // .where('difficulty')
        // .equals('easy');

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
