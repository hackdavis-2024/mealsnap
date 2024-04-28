// To run the logic for the backend
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors');

const mealsRouter = require('./routes/meals.js');
const imagesRouter = require('./routes/images.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use('/meals', mealsRouter);
app.use('/images', imagesRouter);

app.use(cors({
    // only allow requests from this origin
    origin: 'http://localhost:3000', // TODO: change for final product
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

const port = process.env.PORT || 5001; // default port is 5001


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
