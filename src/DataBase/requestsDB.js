const mongoose = require('mongoose')


const requestsSchema = new mongoose.Schema({
    request_id: mongoose.SchemaTypes.String,
    request_url: mongoose.SchemaTypes.String,
    isAccepted: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
    },
    designerAccepted: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
    }
})

module.exports = mongoose.model('requests', requestsSchema,)