let mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: String,
    movieImgUrl: String,
});

const movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;