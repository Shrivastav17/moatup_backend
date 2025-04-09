import express from "express";
import invite_sendinvestorupload from "../Middlewares/invitensendinestor.uploads.js";
import createInvestorInvite from "../Controllers/inviteInvestorController.js";

const inviteInvestorRoute = express.Router();

inviteInvestorRoute.post("/inviteInvestor", invite_sendinvestorupload, createInvestorInvite);

export default inviteInvestorRoute;


