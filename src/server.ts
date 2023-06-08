import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes';

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors({origin: process.env.URL_PERM}));
server.use(router);

server.listen({ port: process.env.PORT || 8080 }, () => {
  console.log('The server is running');
});
