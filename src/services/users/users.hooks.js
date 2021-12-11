const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow, iff } = require('feathers-hooks-common')
const { isSelf, isAdmin } = require('../../hooks');

function processGithubProfile(hook) {
  // As an example extract the user email
  if (hook.data.github) {
    hook.data.email = hook.data.github.profile.emails[0].value
  } else {
    return Promise.reject(new Error('Forbidden'))
  }
  return Promise.resolve(hook)
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [  processGithubProfile ],
    update: [  authenticate('jwt'), iff(ctx => !isSelf(ctx) && !isAdmin(ctx), disallow()) ],
    patch: [  authenticate('jwt'), iff(ctx => !isSelf(ctx) && !isAdmin(ctx), disallow()) ],
    remove: [ authenticate('jwt'), iff(ctx => !isSelf(ctx) && !isAdmin(ctx), disallow()) ]
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
