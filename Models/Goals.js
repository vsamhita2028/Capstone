const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true,
    },
    color: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    badgeId: {
        type: String,
        require: true
    }
});

const goals = mongoose.model("Goal", goalSchema);
module.exports = goals;