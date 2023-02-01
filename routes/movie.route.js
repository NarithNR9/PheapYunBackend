const express = require('express')
const router = express.Router()
const {
  addMovie,
  getLatestMovies,
  getMovieByFilter,
  getMovieById,
  editMovie,
} = require('../controllers/movie.controller')

router.post('/', addMovie)

router.post('/edit', editMovie)

router.get('/latest', getLatestMovies)

router.get('/Explore', getMovieByFilter)

router.get('/:movieId', getMovieById)

module.exports = router
