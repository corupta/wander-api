const feathersMongoose = require('feathers-mongoose');
const m2s = require("mongoose-to-swagger")

feathersMongoose.Service = class extends feathersMongoose.Service {
    constructor(...args) {
        super(...args);
        this.docs = {
            definitions: {
                [this.Model.modelName]:  m2s(this.Model),
                [`${this.Model.modelName}_list`]:  {
                    type: 'array',
                    items: { $ref: `#/components/schemas/${this.Model.modelName}` }
                }
            }
        }
    }
}
