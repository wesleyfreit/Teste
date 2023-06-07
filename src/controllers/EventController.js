"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const Event_1 = __importDefault(require("../models/Event"));
class EventController {
    async saveEvent(req, res) {
        const body = req.body;
        if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
            try {
                await Event_1.default.create(body);
                return res.sendStatus(201);
            }
            catch (error) {
                return res.sendStatus(400);
            }
        }
        else
            return res.sendStatus(400);
    }
    async listEvents(req, res) {
        const { value } = req.query;
        try {
            if (value) {
                //transformando o valor para a busca ser case-insensitive
                const regex = new RegExp(value, 'i');
                const events = await Event_1.default.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }] }, { _id: true, __v: false });
                if (events.length > 0)
                    return res.json(events);
                else
                    return res.sendStatus(204);
            }
            const events = await Event_1.default.find({}, { _id: true, __v: false }).sort({ startDate: -1 });
            if (events.length > 0)
                return res.json(events);
            else
                return res.sendStatus(204);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async findEvent(req, res) {
        const id = req.params.id;
        try {
            const event = await Event_1.default.findById(id);
            if (event)
                return res.json(event);
            else
                return res.sendStatus(204);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async updateEvent(req, res) {
        const body = req.body;
        const id = req.params.id;
        if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
            try {
                const event = await Event_1.default.findById(id);
                if (event) {
                    const result = await Event_1.default.updateOne({ _id: id }, { ...body });
                    if (result)
                        return res.sendStatus(200);
                    else
                        return res.sendStatus(400);
                }
                else
                    return res.sendStatus(204);
            }
            catch (error) {
                return res.sendStatus(500);
            }
        }
        else
            return res.sendStatus(400);
    }
    async deleteEvent(req, res) {
        const id = req.params.id;
        try {
            const event = await Event_1.default.findById(id);
            if (event) {
                const result = await Event_1.default.deleteOne({ _id: id });
                if (result)
                    return res.sendStatus(200);
                else
                    return res.sendStatus(400);
            }
            else
                return res.sendStatus(204);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.EventController = EventController;
