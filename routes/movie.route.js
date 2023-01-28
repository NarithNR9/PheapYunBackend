const express = require('express')
const router = express.Router()
const {
  addMovie,
  getLatestMovies,
  getMovieByFilter,
  getMovieById,
} = require('../controllers/movie.controller')

router.post('/', addMovie)

router.get('/latest', getLatestMovies)

router.get('/Explore', getMovieByFilter)

router.get('/:movieId', getMovieById)

module.exports = router
