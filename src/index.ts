import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes";

dotenv.config();

const server = express();
const port = process.env.PORT || 8080;

server.use(express.json());
server.use(cors());
server.use(router);

server.get('/', (req, res) => res.json("Hello World"))

server.listen(port, () => {
  console.log('The server is running');
});
