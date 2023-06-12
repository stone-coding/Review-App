const express = require("express");
require("express-async-errors");

const userRouter = require("./routes/user");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

require("dotenv").config();
require("./db");

const app = express();
app.use(cors());
// mount the data request read by the request from user
app.use(express.json());
app.use("/api/user", userRouter);

app.use('/*',handleNotFound)

app.use(errorHandler);

// app.post("/sign-in",
//     (req, res, next)=>{
//     const {email, password} = req.body
//     if (!email || !password )
//         return res.json({error:"email/password is missing"})
//         next();

// },
// (req, res ) =>{
//     res.send("<h1>Hello I am from you backend about page</h1>")
// })

app.listen(8000, () => {
  console.log("the port is listening on port 8080");
});
