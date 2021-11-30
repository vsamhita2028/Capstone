const express = require("express");
const BadgeRouter = express.Router();
const Goals = require("../Models/Goals");
BadgeRouter.route("/")
    .get((req, res) => {
        const params = req.query.user
        Goals.find({ user: params, status: "Completed" }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ result: result });
            }
        })

    })

module.exports = BadgeRouter;