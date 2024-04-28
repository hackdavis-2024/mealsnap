// To run the logic for the backend
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

import mealsRouter from "./routes/meals";

const app: Express = express();
const port = process.env.PORT || 5001; // default port is 5001

app.use('/meals', mealsRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

mongoose.set("strictQuery", false);

const uri = process.env.ATLAS_URI || "";

mongoose.connect(uri, {
    autoIndex: true
} as ConnectOptions);

mongoose.connection.once("open", async () => {
    console.log("MongoDB databse connection established successfully");

    
})