const { Service } = require('feathers-mongoose');

// We need this to create the MD5 hash
const crypto = require('crypto');

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=128';
// Returns the Gravatar image for an email
const getGravatar = email => {
  // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  // Return the full avatar URL
  return `${gravatarUrl}/${hash}?${query}`;
};

exports.Users = class Users extends Service {
  async get(id, params) {
    let realId = id;
    if (id === 'profile') {
      realId = params.user._id;
      if (!realId) {
        throw new Error('NotFound');
      }
    }
    return super.get(realId, params);
  }
  create (data, params) {
    // This is the information we want from the user signup data
    const { email, githubId, name } = data;
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar(email);
    // The complete user
    const userData = {
      email,
      name,
      githubId,
      avatar
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }  
  async update (id, data, ctx) {
    let realId = id;
    if (id === 'profile') {
      realId = ctx.user._id;
      if (!realId) {
        throw new Error('NotFound');
      }
    }
    const {wandId} = data;
    const updateData = { wandId };

    const wandService = this.options.app.service('wands');
    const wand  = await wandService.Model.findById(wandId).lean();
    if (!wand) {
      throw new Error('No such wand')
    }
    const currentLevel = ctx.user.level;
    if (!(currentLevel >= wand.requiredLevel)) {
      throw new Error('Too low level to equip this wand');
    }

    return this.patch(realId, updateData, ctx);
  }
};