import { Schema } from "mongoose";
import mongoose from "../../database/database";

const eventSchema = new Schema(
  {
    title: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    description: String,
    point: {
      type: { type: String },
      coordinates: { type: Array },
    },
  },
  { collection: "events" }
);

eventSchema.index(
  { title: "text", description: "text" },
  { default_language: "pt", weights: { title: 2, description: 1 } }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
