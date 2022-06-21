const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/api");
const mongoose = require('mongoose');
const helmet = require("helmet");
require('dotenv').config();
const PORT = process.env.PORT;
const dbURI = process.env.DB_URI;

//middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(helmet());
app.use('/uploads', express.static('uploads'));

//api routes module
app.use("/api/v1", apiRoutes);

//database connection and server bootstrapping
// mongoose.set('debug', true);
mongoose
    .connect(dbURI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    })
    .catch((err) => {
        console.log(err);
    });