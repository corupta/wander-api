const assert = require('assert');
const app = require('../../src/app');

describe('\'wands\' service', () => {
  it('registered the service', () => {
    const service = app.service('wands');

    assert.ok(service, 'Registered the service');
  });
});
