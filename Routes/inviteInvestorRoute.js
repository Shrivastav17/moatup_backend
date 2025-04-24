import express from "express";
import invite_sendinvestorupload from "../Middlewares/invitensendinestor.uploads.js";

import {
    createInvestorInvite,
    getAllInvestorInvites,
    getInvestorInviteById,
    deleteInvestorInvite,
} from '../Controllers/inviteInvestorController.js';
const inviteInvestorRoute = express.Router();

inviteInvestorRoute.post('/create', invite_sendinvestorupload, createInvestorInvite);
inviteInvestorRoute.get('/', getAllInvestorInvites);
inviteInvestorRoute.get('/:id', getInvestorInviteById);
inviteInvestorRoute.delete('/:id', deleteInvestorInvite);
export default inviteInvestorRoute;

// inviteInvestorRoute.post("/inviteInvestor", invite_sendinvestorupload, createInvestorInvite);
