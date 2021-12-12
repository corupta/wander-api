const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow, iff } = require('feathers-hooks-common')
const { isAdmin } = require('../../hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [iff(ctx => !isAdmin(ctx), disallow())],
    update: [iff(ctx => !isAdmin(ctx), disallow())],
    patch: [iff(ctx => !isAdmin(ctx), disallow())],
    remove: [iff(ctx => !isAdmin(ctx), disallow())]
  },

  after: {
    all: [],
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
