const { response } = require('express');
const express = require('express');
const router = express.Router();
const MovieBlogModel = require('../models/MovieBlogModel');

router.get('/', async (req, res) => {
    const MovieData = await MovieBlogModel.getAllMovieData();
    console.log("REQUEST SESSION: ", req.session);
    // const rankings = await MovieBlogModel.getAllRankings();
    // console.log("RANKINGS ARE: ", rankings);
    res.render('template', {
        locals: {
            title: 'Movie Blog',
            data: MovieData,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/home'
        }
    })

});









module.exports = router;