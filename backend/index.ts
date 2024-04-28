// To run the logic for the backend
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

const app: Express = express();
const port = process.env.PORT || 5001; // default port is 5001

app.use(
    
)