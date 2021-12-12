const assert = require('assert');
const app = require('../../src/app');

describe('\'spell-check\' service', () => {
  it('registered the service', () => {
    const service = app.service('spell-check');

    assert.ok(service, 'Registered the service');
  });
});
