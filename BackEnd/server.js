// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const express = require("express");
// const app = express();
// const dataRouter = require("./dataRoutes");
// const hpp = require("hpp");
// const cors = require("cors");

// app.use(cors());

// const PORT = process.env.PORT || 3000;

// dotenv.config({ path: "./config.env" });

// mongoose.connect(process.env.DATABASE_LOCAL).then((con) => {
//   console.log("DB connection successful");
// });

// app.use(hpp());

// app.use("/", dataRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import { PrismaClient } from "@prisma/client";
import express from "express";
import hpp from "hpp";
import cors from "cors";
import dataRouter from "./dataRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(hpp());

app.use("/", dataRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
