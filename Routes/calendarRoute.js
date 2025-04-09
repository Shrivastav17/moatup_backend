import express from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/calendarController.js";

const eventRoute = express.Router();

// Get all events
eventRoute.get("/get", getAllEvents);

// Create a new event
eventRoute.post("/create", createEvent);

// Update an event by ID
eventRoute.put("/update:id", updateEvent);

// Delete an event by ID
eventRoute.delete("/delete:id", deleteEvent);

export default eventRoute;
