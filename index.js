
const express = require('express')
const app = express()
var cors = require('cors')
const authRouter = require("./Routes/google-util")
const taskRouter = require("./Routes/TaskRouter");
const mailRouter = require("./Routes/MailRouter");
const goalsRouter = require("./Routes/GoalsRouter");
const activityRouter = require("./Routes/ActivityRouter");
const badgeRouter = require("./Routes/BadgesRouter");
const mongoose = require("mongoose");
app.use(cors()); // to handle cross-origin errors
app.use(express.urlencoded({ extended: true })); // to make sure that we are able to access the request body.
app.use(express.json());
require("dotenv").config({ path: "./config.env" })
const port = process.env.PORT;
const dbURI = process.env.MONGOURI;

app.use('/auth', authRouter);
app.use('/tasks', taskRouter);
app.use('/mails', mailRouter);
app.use('/goals', goalsRouter);
app.use('/activity', activityRouter);
app.use('/badges', badgeRouter);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`); // Server start;
    });
  }).catch((err) => console.log(err));
