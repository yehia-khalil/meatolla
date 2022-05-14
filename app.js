const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/api");

//middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

//api routes module
app.use(apiRoutes);


app.listen(8080, ()=>{
    console.log(apiRoutes)
});