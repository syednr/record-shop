const express=require("express")
require("./mongooseConnection")
const port = 3000;
const userRoutes= require("./routes/userRoutes")
const recordRoutes= require("./routes/recordRoutes")
const orderRoutes= require("./routes/orderRoutes")
const createError = require("http-errors")
const cors=require("cors")
//create express server
const app = express()

//cors middlware
/* app.use(cors({origin:"*"})) */
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods",["GET","POST","PATCH","DELETE","OPTIONS"])
    next()
})

//express middleware
//parsing req.body
app.use(express.json())

//external middleware
/* app.use(logger("combined")) */

//custom  middleware
function printTime(req,res,next){
    console.log("time: ",new Date())
    next()
}

function clgValue(req,res,next){
    console.log("Method: ", req.method)
    console.log("url: ", req.url)
    next()
}

app.use(printTime)
app.use(clgValue)

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})
app.use("/users",userRoutes)
app.use("/records",recordRoutes )
app.use("/orders",orderRoutes )


// 404 page not found middleware
app.use((req,res,next)=>{
   /*  let err = new Error("page not found") */
   /*  err.status=404; */

/*  let err = new createError.NotFound() */

    let err = createError(404,"page not found")
   
    next(err)
})

//error handling middleware/ universal error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500).send({success:false, message:err.message})
})



app.listen(port, ()=>console.log("express server is running on port: ",port))