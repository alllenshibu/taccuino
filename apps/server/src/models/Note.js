const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    }
})

module.exports = mongoose.model('Note', noteSchema);
