const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    goal: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    badgeId: {
        type: String,
        require: true
    }
});

const badges = mongoose.model("Bage", badgeSchema);
module.exports = badges;