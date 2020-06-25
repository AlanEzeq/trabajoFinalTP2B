'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
let MovieSchema = new Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  num_mflix_comments: Number,
  title: String,
  fullplot: String,
  countries: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: { wins: Number, nominations: Number, text: String },
  lastupdated: Date,
  year: Number,
  imdb: { rating: mongoose.Decimal128, votes: Number, id: Number },
  type: String,
  tomatoes: { viewer: { rating: Number, numReviews: Number, meter: Number }, lastUpdated: Date }
});

// AR - Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. 
// Models are responsible for creating and reading documents from the underlying MongoDB database.
// https://mongoosejs.com/docs/models.html 
module.exports = mongoose.model('Movies', MovieSchema);