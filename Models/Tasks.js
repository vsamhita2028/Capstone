const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Number,
    },
    endDate: {
        type: Number,
    },
    hours: {
        type: Number,
    }
});

const Tasks = mongoose.model("Task", taskSchema);
module.exports = Tasks;