// Initializes the `wands` service on path `/wands`
const { Wands } = require('./wands.class');
const createModel = require('../../models/wands.model');
const hooks = require('./wands.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/wands', new Wands(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('wands');

  service.hooks(hooks);
};
