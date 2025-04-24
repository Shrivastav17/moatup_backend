import express from 'express';
import {
  createCompleteProfile,
  getAllCompleteProfiles,
  getCompleteProfileById,
  updateCompleteProfile,
  deleteCompleteProfile
} from '../Controllers/completeProfileController.js';

const completeProfileRoute = express.Router();

completeProfileRoute.post('/', createCompleteProfile);
completeProfileRoute.get('/', getAllCompleteProfiles);
completeProfileRoute.get('/:id', getCompleteProfileById);
completeProfileRoute.put('/:id', updateCompleteProfile);
completeProfileRoute.delete('/:id', deleteCompleteProfile);

export default completeProfileRoute;
