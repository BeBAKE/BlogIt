//! index - wss - class - pg/prisma

import express from "express";
import http from "http";
import cors from "cors";
import WSS from "./wss";
import dotenv from 'dotenv'
import  { imgRouter } from "./routes/image";

dotenv.config()

const app = express();

app.use(cors({
  origin : process.env.ALLOWED_ORIGIN
}));

app.use(express.json())

app.use("/api/v1",imgRouter)

const server = http.createServer(app);

new WSS(server);

server.listen(3000, () => console.log("HTTP server is running on port 3000"));



