// AR - use strict
// – Captura algunos errores comunes en nuestro código y nos muestra la excepción.
// – Previene (o muestra errores) cuando tomamos algunas acciones consideradas como «inseguras» en nuestro código, 
// como por ejemplo acceder al objeto global (window en el navegador).
// – Deshabilita funcionalidades que son confusas
// O sea, usar use strict es hacer nuestro código mejor y más seguro.
'use strict';

module.exports = function (app) {
  let list = require('../controllers/listController');

  // AR Routes
  app.route('/movies')
    .get(list.list_all_movies);

  app.route('/movie')
    .post(list.create_a_movie);

  app.route('/movie/:movieId')
    .get(list.read_a_movie)
    .put(list.update_a_movie)
    .delete(list.delete_a_movie);
 
};
