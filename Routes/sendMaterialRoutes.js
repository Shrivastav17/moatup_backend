import express from "express";
import invite_sendinvestorupload from "../Middlewares/invitensendinestor.uploads.js";
import {
  createSendMaterial,
  getAllSendMaterials,
  // updateSendMaterial,
  deleteSendMaterial
} from "../Controllers/sendMaterialControllers.js";

const sendMaterialRoute = express.Router();

// === Routes ===
sendMaterialRoute.post(
  "/send-material",
  invite_sendinvestorupload,
  createSendMaterial
);

sendMaterialRoute.get("/send-material", getAllSendMaterials);
// sendMaterialRoute.put("/send-material/:id", updateSendMaterial);
sendMaterialRoute.delete("/send-material/:id", deleteSendMaterial);

export default sendMaterialRoute;
