// Initializes the `spell-check` service on path `/spell-check`
const { SpellCheck } = require('./spell-check.class');
const hooks = require('./spell-check.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/spell-check', new SpellCheck(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('spell-check');

  service.hooks(hooks);
};
