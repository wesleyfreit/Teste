"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const Event_1 = __importDefault(require("../models/Event"));
class EventController {
    saveEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
                try {
                    yield Event_1.default.create(body);
                    return res.sendStatus(201);
                }
                catch (error) {
                    return res.sendStatus(400);
                }
            }
            else
                return res.sendStatus(400);
        });
    }
    listEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = req.query;
            try {
                if (value) {
                    //transformando o valor para a busca ser case-insensitive
                    const regex = new RegExp(value, 'i');
                    const events = yield Event_1.default.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }] }, { _id: true, __v: false });
                    if (events.length > 0)
                        return res.json(events);
                    else
                        return res.sendStatus(204);
                }
                const events = yield Event_1.default.find({}, { _id: true, __v: false }).sort({ startDate: -1 });
                if (events.length > 0)
                    return res.json(events);
                else
                    return res.sendStatus(204);
            }
            catch (error) {
                return res.sendStatus(500);
            }
        });
    }
    findEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const event = yield Event_1.default.findById(id);
                if (event)
                    return res.json(event);
                else
                    return res.sendStatus(204);
            }
            catch (error) {
                return res.sendStatus(500);
            }
        });
    }
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const id = req.params.id;
            if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
                try {
                    const event = yield Event_1.default.findById(id);
                    if (event) {
                        const result = yield Event_1.default.updateOne({ _id: id }, Object.assign({}, body));
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
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const event = yield Event_1.default.findById(id);
                if (event) {
                    const result = yield Event_1.default.deleteOne({ _id: id });
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
        });
    }
}
exports.EventController = EventController;
//# sourceMappingURL=EventController.js.map