// LIBRARIES
import express from "express";
// CONFIGURATION
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export {app, PORT}