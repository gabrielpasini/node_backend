const mongoose = require('../database');

const CorreiosStatusSchema = new mongoose.Schema({
    id: {
        type: String,
        default: 'greve'
    },
    status: {
        type: Boolean,
        default: false,
    }
});

const CorreiosStatus = mongoose.model('CorreiosStatus', CorreiosStatusSchema);

module.exports = CorreiosStatus;