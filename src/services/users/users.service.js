// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const options = {
    app,
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  app.post('/users', (req, res)  => {
    res.status(403).json({error:'Forbidden'});
  })
  app.patch('/users/:id', (req, res) => {
    res.status(403).json({error:'Forbidden'});
  })

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
