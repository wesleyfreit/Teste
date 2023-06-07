"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_1 = __importDefault(require("../../database/database"));
const eventSchema = new mongoose_1.Schema({
    title: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    description: String,
    point: {
        type: { type: String },
        coordinates: { type: Array },
    },
}, { collection: "events" });
eventSchema.index({ title: "text", description: "text" }, { default_language: "pt", weights: { title: 2, description: 1 } });
const Event = database_1.default.model("Event", eventSchema);
exports.default = Event;
