// const express = require("express");
// const dataController = require("./dataController");

// const router = express.Router();

// router.route("/data").get(dataController.getAllData);

// router.route("/filter-data").get(dataController.filterData);

// module.exports = router;

import express from "express";
const router = express.Router();
import dataController from "./dataController.js";

router.route("/data").get(dataController.getAllData);

router.route("/filter-data").get(dataController.filterData);

export default router;
