//! index - wss - class - pg/prisma

import express from "express";
import http from "http";
import cors from "cors";
import WSS from "./wss";
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors({
  origin : "*"
}));

const server = http.createServer(app);

new WSS(server);

server.listen(3000, () => console.log("HTTP server is running on port 3000"));



