const express = require("express");
const Tasks = require("../Models/Tasks");
const activityRouter = express.Router();
const Goals = require("../Models/Goals");
activityRouter.route("/productivity")
    .get((req, res) => {
        let resultData = { today: [], yesterday: [] }
        let start1 = new Date();
        start1.setHours(0, 0, 0, 0);
        let end1 = new Date();
        end1.setHours(23, 59, 59, 999);
        const params = req.query.user;
        Tasks.aggregate([{
            $match: {
                user: params,
                date: { $gte: start1, $lt: end1 }
            }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }, { $sort: { '_id': -1 } }], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("1", result)
                resultData["today"] = result;
                // res.send({ result: result });
            }
        }).then(() => {
            let start2 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
            start2.setHours(0, 0, 0, 0);
            let end2 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
            end2.setHours(23, 59, 59, 999);
            Tasks.aggregate([{
                $match: {
                    user: params,
                    date: { $gte: start2, $lt: end2 }
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }, { $sort: { '_id': -1 } }], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("2", result)
                    resultData["yesterday"] = result
                    res.send({ result: resultData });
                }
            })
        })
    })
activityRouter.route("/goalsProductivity")
    .get((req, res) => {
        let resultData = { data: [], missed: 0 }
        const params = req.query.user;
        const today = new Date()
        Goals.aggregate([{
            $match: {
                user: params,
            }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }, { $sort: { '_id': -1 } }], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                resultData["data"] = result
                //res.send({ result: result });
            }
        }).then(() => {
            Goals.aggregate([{
                $match: {
                    user: params,
                    endDate: { $lt: today },
                    status: { $in: ["In Progress", "Not Started"] }
                }
            },
            {
                $group: {
                    _id: null,
                    n: { $sum: 1 }
                }
            }], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    resultData["missed"] = result[0].n;
                    res.send({ result: resultData });
                }
            })
        })
    })
activityRouter.route("/getTasks")
    .get((req, res) => {
        const params = req.query;
        Tasks.aggregate([{
            $match: {
                user: params.user,
                date: { $gte: new Date(params.start), $lt: new Date(params.end) }
            }
        }], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ result: result });
            }
        })
    })

activityRouter.route("/getMonthly")
    .get((req, res) => {
        const params = req.query;
        let months = ["", "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        Tasks.aggregate([{
            $match: {
                user: params.user
            }
        },
        {
            $group: {
                _id: { month: { $month: "$date" }, year: { $year: "$date" }, status: "$status" },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id': 1 } },
        {
            $group: {
                _id: null,
                counts: {
                    $push: { status: "$_id.status", month: "$_id.month", year: "$_id.year", value: "$count" }
                }
            }
        },
        ], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let data = [];
                // console.log(result);
                if (result) {
                    const arr = result[0]?.counts ? result[0]?.counts : [];
                    data = [...arr];
                    arr.forEach((elem, idx) => {
                        data[idx]["month"] = months[elem.month];
                    })
                }
                res.send({ result: data });
            }
        })
    })

activityRouter.route("/getMonthlyGoals")
    .get((req, res) => {
        const params = req.query;
        let months = ["", "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        Goals.aggregate([{
            $match: {
                user: params.user
            }
        },
        {
            $group: {
                _id: { month: { $month: "$startDate" }, year: { $year: "$startDate" }, status: "$status" },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id': 1 } },
        {
            $group: {
                _id: null,
                counts: {
                    $push: { status: "$_id.status", month: "$_id.month", year: "$_id.year", value: "$count" }
                }
            }
        },
        ], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let data = [];
                // console.log(result);
                if (result) {
                    const arr = result[0]?.counts ? result[0]?.counts : [];
                    data = [...arr];
                    arr.forEach((elem, idx) => {
                        data[idx]["month"] = months[elem.month];
                    })
                }
                res.send({ result: data });
            }
        })
        // Goals.aggregate([{
        //     $match: {
        //         user: params.user
        //     }
        // },
        // {
        //     $group: {
        //         _id: { month: { $month: "$startDate" }, status: "$status" },
        //         count: { $sum: 1 }
        //     }
        // },
        // { $sort: { '_id': 1 } },
        // {
        //     $group: {
        //         "_id": "$_id.month",
        //         "status": {
        //             "$push": {
        //                 "k": "$_id.status",
        //                 "v": "$count"
        //             }
        //         }
        //     }
        // },
        // {
        //     "$addFields": {
        //         "status": {
        //             "$arrayToObject": "$status"
        //         }
        //     }
        // },
        // ], (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         let data = [];
        //         console.log(result);
        //         if (result) {
        //             result.forEach((elem, idx) => {
        //                 let status = elem.status;
        //                 let total = 0
        //                 for (const x in status) {
        //                     total += status[x];
        //                 }
        //                 let value = {
        //                     month: months[elem._id],
        //                     "Total Milestones": total,
        //                     Completed: elem.status.Completed ? elem.status.Completed : 0,
        //                     idx: elem._id
        //                 }
        //                 data.push(value);
        //             })
        //         }
        //         res.send({ result: data });
        //     }
        // })
    })


module.exports = activityRouter;