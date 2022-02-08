//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema (
    {
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    catchPhrase: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
);

const Celebrity = mongoose.model('Celebrity', CelebritySchema)

module.exports = Celebrity