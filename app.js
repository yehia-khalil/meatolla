const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())




app.listen(8080, ()=>{
    console.log("index")
});