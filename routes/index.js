var express = require('express');
var request = require('sync-request');
var router = express.Router();
require('dotenv').config();

let movieModel = require('../models/movies.js');


/* GET home page. */
router.get('/new-movies', function(req, res, next) {
let dataMovie = request('GET', "https://api.themoviedb.org/3/discover/movie?api_key=" + process.env.API_KEY + "&&language=fr-FR&region=FR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-01-01");
let result = JSON.parse(dataMovie.body);res.json({result});
});

router.post('/wishlist-movie', async function(req, res, next) {
  let newMovie = movieModel({
    movieName: req.body.name,
    movieImgUrl: req.body.url
  });
  movieSave = await newMovie.save();
  let result = false;
  if(movieSave.movieName){
    result = true;
  }
  res.json({result});
});
 

router.get('/wishlist-movie', async function(req, res, next) {
  let listMovies = await movieModel.find();
  res.json({listMovies});
});

router.delete('/wishlist-movie/:name', async function(req, res, next) {
  let returnDo = await movieModel.deleteOne({movieName: req.params.name});

  let result = false;
  if(returnDo.deletedCount === 1){
    result = true;
  }
  res.json({result});
});



module.exports = router;
