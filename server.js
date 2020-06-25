let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Movie = require('./api/models/listModel'), //created model loading here
  bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// AR cacheo el error por si no tengo conección.
mongoose.connect("mongodb+srv://admin:alan2812@cluster0-4tlnj.mongodb.net/sample_mflix", { useUnifiedTopology: true, useNewUrlParser: true }).catch(error => console.log(error.message));

// AR parametrizacion de la app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let funcionRoutes = require('./api/routes/listRoutes'); // AR cargo las rutas

funcionRoutes(app); // AR registro las rutas en el server

// AR es lo mismo de arriba pero alrevez.
app.route('/Test').get(function(req, res){
  res.send('GET route on Test.');
});


app.listen(port);

console.log('RESTful API servidor escuchando en puerto: ' + port);

// AR Habilito el Swagger para documentar y facilitar al usuario el uso de la API Rest
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// AR si las URLs no se corresponden a las tratadas me devuelve error.
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' no encontrado'})
});