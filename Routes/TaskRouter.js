const { ObjectId } = require('bson');
const express = require('express');
const taskRouter = express.Router();
const Task = require("../Models/Tasks");
var ObjectID = require('mongodb').ObjectID;
taskRouter.route("/addTask")
    .post((req, res) => {
        const data = req.body;
        const newTask = new Task(data);
        newTask.save();
        res.send({ msg: "done" });
    })

taskRouter.route("/getTask")
    .get((req, res) => {

        const param = req.query;
        console.log(param);
        var start = new Date(param.start);
        start.setHours(0, 0, 0, 0);
        var end = new Date(param.end);
        end.setHours(23, 59, 59, 999);
        console.log(start, end);
        Task.aggregate([
            {
                $match: {
                    user: param.user,
                    date: { $gt: start, $lt: end }
                }
            },
            {
                $group: {
                    _id: "$status",
                    tasks: {
                        $push: {
                            _id: "$_id",
                            date: "$date",
                            description: "$description",
                            startDate: "$startDate",
                            endDate: "$endDate",
                            status: "$status",
                            title: "$title"
                        }
                    }
                }
            },
            { $sort: { '_id': -1 } }
        ], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send({ result: result });
            }
        })
        // Task.find(param, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         res.send({ result: result });
        //     }
        // })
    })
// Get weekly Task :

taskRouter.route("/getWeeklyTasks")
    .get((req, res) => {
        var now = new Date();
        var start = new Date(new Date(now).setDate(now.getDate() - 6));
        start.setHours(0, 0, 0, 0);
        var end = new Date();
        end.setHours(23, 59, 59, 999);
    })

taskRouter.route("/updateTaskStatus")
    .put((req, res) => {
        const data = req.body;
        Task.updateOne({ "_id": data._id }, { $set: { "status": data.status } }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ msg: "updated" });
            }
        })
    })
taskRouter.route("/deleteTask")
    .delete((req, res) => {
        const data = req.body;
        Task.deleteOne(data, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ msg: "deleted" });
            }
        })
    })

taskRouter.route("/updateTaskDetails")
    .put((req, res) => {
        const data = req.body;
        Task.updateOne({ "_id": data._id }, { $set: data.updateData }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ msg: "updated" });
            }
        })
    })

module.exports = taskRouter