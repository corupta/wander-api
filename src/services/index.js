const users = require('./users/users.service.js');
const wands = require('./wands/wands.service.js');
const spells = require('./spells/spells.service.js');
const spellCheck = require('./spell-check/spell-check.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(wands);
  app.configure(spells);
  app.configure(spellCheck);
};
