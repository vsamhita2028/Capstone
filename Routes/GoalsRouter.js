const express = require("express");

const goalsRouter = express.Router();
const Goals = require("../Models/Goals");
goalsRouter.route("/")
    .get((req, res) => {
        const param = req.query;
        Goals.find(param, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ result: result });
            }
        })
    })
    .post((req, res) => {
        const data = req.body;
        const newGoal = new Goals(data);
        newGoal.save()
            .then((result) => {
                res.send({ msg: "done" })
            })
    })
    .put((req, res) => {
        const data = req.body;
        Goals.updateOne({ _id: data._id }, { $set: data.updateData }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ msd: "updated" })
            }
        })
    })
    .delete((req, res) => {
        const data = req.body;
        Goals.deleteOne(data, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ msg: "deleted" })
            }
        })
    })
module.exports = goalsRouter