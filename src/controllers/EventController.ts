import { Request, Response } from 'express';
import Event from '../models/Event';
import redisConnection from '../../database/redis';

const redisClient = redisConnection.getClient();

type iEvent = {
  title: string;
  startDate: Date;
  endDate: Date;
  description: Text;
  point: {
    type: String;
    coordinates: [number, number];
  };
};

export class EventController {
  public async saveEvent(req: Request, res: Response) {
    const body = <iEvent>req.body;
    if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
      try {
        const event = await Event.create(body);
        await redisClient.set(`id-${event.id}`, JSON.stringify(event), { EX: 3600 });
        await redisClient.del('array-events');
        return res.sendStatus(201);
      } catch (error) {
        return res.sendStatus(400);
      }
    } else return res.sendStatus(400);
  }

  public async listEvents(req: Request, res: Response) {
    const { value } = req.query;
    try {
      if (value) {
        const regex = new RegExp(value as string, 'i');
        const events = await Event.find(
          { $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }] },
          { _id: true, __v: false },
        );
        if (events.length > 0) return res.json(events);
        else return res.sendStatus(204);
      }
      const redisEvents = await redisClient.get('array-events');
      if (redisEvents) return res.json(JSON.parse(redisEvents));
      const events = await Event.find({}, { _id: true, __v: false }).sort({ startDate: -1 });
      if (events.length > 0) {
        await redisClient.set('array-events', JSON.stringify(events), { EX: 3600 });
        return res.json(events);
      } else return res.sendStatus(204);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  public async findEvent(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const redisConsult = await redisClient.get(`id-${id}`);
      if (redisConsult) return res.json(JSON.parse(redisConsult));
      const event = await Event.findById(id);
      if (event) {
        await redisClient.set(`id-${id}`, JSON.stringify(event), { EX: 3600 });
        return res.json(event);
      } else return res.sendStatus(204);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  public async updateEvent(req: Request, res: Response) {
    const body = <iEvent>req.body;
    const id = req.params.id;
    if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
      try {
        const result = await Event.findOneAndUpdate({ _id: id }, { ...body });
        if (result) {
          await redisClient.set(`id-${id}`, JSON.stringify(event), { EX: 3600 });
          await redisClient.del('array-events');
          return res.sendStatus(200);
        } else return res.sendStatus(400);
      } catch (error) {
        return res.sendStatus(404);
      }
    } else return res.sendStatus(400);
  }

  public async deleteEvent(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await Event.findOneAndRemove({ _id: id });
      if (result) {
        await redisClient.del(`id-${id}`);
        await redisClient.del('array-events');
        return res.sendStatus(200);
      } else return res.sendStatus(400);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}
