import express from "express";
import selectinvestor from "../Controllers/homeinvestorController.js";


const selectinvestorRouter = express.Router();

selectinvestorRouter.post('/selectinvestor',selectinvestor);

export default selectinvestorRouter;