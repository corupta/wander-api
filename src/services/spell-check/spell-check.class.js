const { similarityCheck } = require('../../helpers/similarityCheck');

/* eslint-disable no-unused-vars */
exports.SpellCheck = class SpellCheck {
  constructor (options) {
    this.options = options || {};
    this.docs = {
      definitions: {
          ['spell-check']:  {},
      }
    }
  }

  // async find (params) {
  //   return [];
  // }

  // async get (id, params) {
  //   return {
  //     id, text: `A new message with ID: ${id}!`
  //   };
  // }

  async create (data, ctx) {
    const { spellId, points } = data;

    if (!Array.isArray(points) || !Array.isArray(points[0]) || points[0].length !== 2) {
      throw new Error('points should be an array of arrays. eg: [[0,1],[0,0.5],[-0.5,0.5]]');
    }
    const spellService = this.options.app.service('spells');
    const spell  = await spellService.Model.findById(spellId).lean();
    if (!spell) {
      throw new Error('No such spell')
    }
    const currentLevel = ctx.user.level;
    if (!(currentLevel >= spell.requiredLevel)) {
      throw new Error('Too low level to try out this spell');
    }
    const { isSimilar, buffer } = await similarityCheck(points, spell);
    let levelUp = false;
    if (isSimilar) {
      if (currentLevel === spell.requiredLevel) {
        levelUp = true;
        ctx.user.level += 1;
        await ctx.user.save();
      }
    }
    return {
      isSimilar,
      levelUp,
      user: ctx.user,
      drawnImage: buffer.toString('base64')
    }
  }

  // async update (id, data, params) {
  //   return data;
  // }

  // async patch (id, data, params) {
  //   return data;
  // }

  // async remove (id, params) {
  //   return { id };
  // }
};
