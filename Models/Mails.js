const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    from: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
});

const Mails = mongoose.model("Mail", mailSchema);
module.exports = Mails;