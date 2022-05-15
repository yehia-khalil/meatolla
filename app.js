const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/api");

//middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//api routes module
app.use("/api/v1",apiRoutes);


app.listen(8080, ()=>{
    console.log(apiRoutes)
});