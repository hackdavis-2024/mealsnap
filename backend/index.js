// To run the logic for the backend
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

const mealsRouter = require('./routes/meals.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001; // default port is 5001

app.use(express.json());
app.use('/meals', mealsRouter);


app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

mongoose.set("strictQuery", false);

const uri = process.env.ATLAS_URI || "";

console.log("uri: " + uri);

mongoose.connect(uri, {
    autoIndex: true
});

mongoose.connection.once("open", async () => {
    console.log("MongoDB database connection established successfully");
});