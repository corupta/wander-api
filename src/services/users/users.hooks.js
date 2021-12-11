const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow, iff } = require('feathers-hooks-common')
const { isSelf, isAdmin } = require('../../hooks');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [  ],
    update: [  authenticate('jwt'), iff(ctx => !isSelf(ctx) && !isAdmin(ctx), disallow()) ],
    patch: [  authenticate('jwt') ],
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
