"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventController_1 = require("./controllers/EventController");
const router = (0, express_1.Router)();
const eventController = new EventController_1.EventController();
router.get("/events", eventController.listEvents);
router.get("/events/:id", eventController.findEvent);
router.post("/events", eventController.saveEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);
exports.default = router;
//# sourceMappingURL=routes.js.map