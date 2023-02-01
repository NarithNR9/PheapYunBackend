const Movie = require('../models/Movie')

exports.addMovie = async (req, res) => {
  const { title, type, country, genre, episodes, description, imageUrl } =
    req.body

  //validate
  if (
    !title ||
    !type ||
    !country ||
    !genre ||
    !episodes ||
    !description ||
    !imageUrl
  ) {
    return res.status(400).json({ message: 'Please include all field' })
  }

  //create movie
  const movie = await Movie.create({
    title,
    type,
    country,
    genre,
    episodes,
    description,
    imageUrl,
  })

  if (movie) {
    res.status(201).json({
      _id: movie._id,
      title: movie.title,
      type: movie.type,
      country: movie.country,
      genre: movie.genre,
      episodes: movie.episodes,
      description: movie.description,
      imageUrl: movie.imageUrl,
    })
  } else {
    res.status(400).json('Invalid user data')
  } 
}

exports.getLatestMovies = async (req, res) => {

  const movie = await Movie.find().sort({ createdAt: 'desc' })
  if (movie) {
    res.json({
      movies: movie,
    })
  } else {
    res.json({
      message: 'No movies',
    })
  }
}

exports.getMovieByFilter = async (req, res) => {
  function filterByNotUndifined(item) {
    // console.log(Object.values(item).includes(undefined))
    if (!Object.values(item).includes('')) {
      return true
    } else return false
  }

  // const arrByID = arr.filter(filterByID);

  const { country, type, genre, title } = req.query
  const data = [{ country }, { type }, { genre }, {title: {$regex: title, $options: 'i'}}].filter(filterByNotUndifined)
  const para = {
    filter: data,
  }
  const movies = await Movie.find({ $and: para['filter'] }).sort({ createdAt: 'desc' }).limit(10)
  // const movie = await Movie.find({genre: 'Animation'}) 
  if (movies) {
    res.json({ 
      movies 
    }) 
  } else {   
    res.status(404).json({   
      message: 'No movies',
    })
  }
}  

exports.getMovieById = async (req, res) => { 
  const id = req.params.movieId
  let movie = await Movie.findById(id)

  if (movie) {
    res.json({
      movie: {
        id: movie._id,
        title: movie.title,
        type: movie.type,
        country: movie.country,
        genre: movie.genre,
        episodes: movie.episodes,
        description: movie.description,
        imageUrl: movie.imageUrl,
        createdAt: movie.createdAt.toDateString().slice(4),
      },
    })
  } else {
    res.json({
      message: 'No movies',
    })
  }
}
