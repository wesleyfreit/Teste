import { Router } from "express";
import { EventController } from "./controllers/EventController";

const router = Router();

const eventController = new EventController();

router.get("/events", eventController.listEvents);
router.get("/events/:id", eventController.findEvent);
router.post("/events", eventController.saveEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

export default router;
