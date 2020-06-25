'use strict';


var mongoose = require('mongoose'),
  Movie = mongoose.model('Movies'); 

exports.list_all_movies = async function (req, res) {
  try {
    const pageOptions = {  // AR por defecto arranco con la página 0 y 10 películas por página
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10
    }

    //AR no permito que se traigan mas de 200 casos x perfomance
    if (pageOptions.limit >= 200) pageOptions.limit = 200;

    const results = await Movie.find()
      .skip(pageOptions.page * pageOptions.limit) // AR salta al registro indicado por parámetros
      .limit(pageOptions.limit);

    if (results.length > 0) {
      results.forEach((result, i) => {
        console.log();
        console.log(`${i + 1}. Titulo: ${result.title}`);
        console.log(`   _id: ${result._id}`);
      });
      return res.status(200).json(results);
    } else {
      console.log("No se encontraron resultados.");
      return res.status(404).json("No se encontraron resultados.");
    }

    //   {}, function (err, movie) {
    //   if (err) return res.status(500).send(err);
    //   res.status(200).json(movie);
    // }) // AR acoto la salida con los parametros recibidos

  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message);
  }
};

exports.create_a_movie = async function (req, res) {
  try {
    var new_movie = new Movie(req.body);
    await new_movie.save(function (err, movie) {
      if (err) return res.status(505).send(err);
      res.json(movie);
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message);
  }
};


exports.read_a_movie = async function (req, res) {
  try {
    const result = await Movie.findOne(mongoose.Types.ObjectId(req.params.movieId))

    if (result) {
      return res.json(result);
    } else {
      res.status(404).json({ message: `La película (${req.params.movieId}) no existe` });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message);
  }
};


exports.update_a_movie = async function (req, res) {
  try {
    await Movie.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.params.movieId) 
    }, req.body, { new: true },
      function (err, movie) {
        if (err)
          return res.status(404).send(err);
        res.json(movie);
      });
  }
  catch (error) {
    console.log(error)
    return res.status(500).json(error.message);
  }
};


exports.delete_a_movie = async function (req, res) {
  try {
    await Movie.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.movieId) // AR armo el objeto ID para asegurarme que esta bien, si falla salta por error si falla salta por error que lo trapeo
    }, function (err, movie) {
      if (err) return res.status(500).send(err);
      if (!movie || movie.deletedCount != 1) return res.status(404).json({ message: `No se encontró la película:(${req.params.movieId})` });
      res.json({ message: 'Pelicula eliminada exitosamente' });
    });
  }
  catch (error) {
    console.log(error)
    return res.status(500).json(error.message);
  }

};