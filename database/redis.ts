import { createClient} from 'redis';
import dotenv from 'dotenv';

dotenv.config();

class Redis {
  private client;

  constructor() {
    this.client = createClient({url: process.env.REDIS_URL});
    this.client.on('error', async (err) => {
      console.log('Redis Client Error', err);
    });
    this.client.connect();
  }

  public getClient() {
    return this.client;
  }
}

const redisConnection = new Redis();

export default redisConnection;
