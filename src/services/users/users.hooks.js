const { authenticate } = require('@feathersjs/authentication').hooks;

function processGithubProfile(hook) {
  // As an example extract the user email
  if (hook.data.github) {
    hook.data.email = hook.data.github.profile.emails[0].value
  }
  return Promise.resolve(hook)
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [  processGithubProfile ],
    update: [  authenticate('jwt') ],
    patch: [  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
