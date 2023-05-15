const express = require('express')
const userRouter = require('./routes/user')

const app = express()
// mount the data request read by the request from user
app.use(express.json())
app.use('/api/user',userRouter);



app.get("/about", (req, res)=>{
    res.send("<h1>Hello I am from you backend about page</h1>")
})

app.listen(8000, ()=>{
    console.log('the port is listening on port 8080');
})


