import express from "express";
import search from "../Controllers/usersearchControllers.js";

const searchRoute = express.Router();

searchRoute.get('/searchuser',search);

export default searchRoute;