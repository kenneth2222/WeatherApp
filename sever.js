const express = require('express');
require('dotenv').config();
const cors = require("cors");
require('./config/database');
const PORT = process.env.PORT;
const app = express();
app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
const weatherRouter = require("./routes/weatherRouter");


app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(weatherRouter);



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});