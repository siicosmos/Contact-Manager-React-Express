var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 50},
        last_name: {type:String, required: true, max: 50},
        email: {type: String, max: 50},
        phone_number: {type: String, max: 50},
        notes: {type: String, max: 500}
    }
);

// virtual to contact's url
ContactSchema
    .virtual('url')
    .get(function () {
        return '/manager/contact/' + this._id;
    });

// export model
module.exports = mongoose.model('Contact', ContactSchema);