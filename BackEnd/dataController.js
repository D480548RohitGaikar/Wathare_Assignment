// const MachineData = require("./dataModel");

// exports.getAllData = async (req, res) => {
//   try {
//     const data = await MachineData.find({ collection: "data" });

//     res.status(200).json({
//       status: "success",
//       results: data.length,
//       data,
//     });
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     res.status(500).json({
//       status: "fail",
//       message: "Internal server error",
//     });
//   }
// };

// exports.filterData = async (req, res) => {
//   try {
//     const { startTime, endTime, frequency } = req.query;

//     if (!startTime || !endTime || !frequency) {
//       return res.status(400).json({ message: "Missing required parameters" });
//     }

//     const startDate = new Date(startTime);
//     const endDate = new Date(endTime);

//     const query = {
//       ts: { $gte: startDate, $lte: endDate },
//     };

//     let aggregationPipeline = [];
//     if (frequency === "hour") {
//       aggregationPipeline.push({
//         $group: {
//           _id: { $hour: "$ts" },
//           data: { $push: "$$ROOT" },
//         },
//       });
//     } else if (frequency === "day") {
//       aggregationPipeline.push({
//         $group: {
//           _id: { $dayOfMonth: "$ts" },
//           data: { $push: "$$ROOT" },
//         },
//       });
//     } else if (frequency === "week") {
//       aggregationPipeline.push({
//         $group: {
//           _id: { $week: "$ts" },
//           data: { $push: "$$ROOT" },
//         },
//       });
//     } else if (frequency === "month") {
//       aggregationPipeline.push({
//         $group: {
//           _id: { $month: "$ts" },
//           data: { $push: "$$ROOT" },
//         },
//       });
//     } else {
//       return res.status(400).json({ message: "Invalid frequency" });
//     }

//     const filteredData = await MachineData.aggregate(aggregationPipeline);

//     res.status(200).json({ status: "success", data: filteredData });
//   } catch (err) {
//     console.error("Error filtering data:", err);
//     res.status(500).json({ status: "fail", message: "Internal server error" });
//   }
// };

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllData = async (req, res) => {
  try {
    const data = await prisma.machineData.findMany();

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

export const filterData = async (req, res) => {
  try {
    const { startTime, endTime, frequency } = req.query;

    if (!startTime || !endTime || !frequency) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const filteredData = await prisma.machineData.findMany({
      where: {
        ts: {
          gte: new Date(startTime),
          lte: new Date(endTime),
        },
      },
    });

    res.status(200).json({ status: "success", data: filteredData });
  } catch (err) {
    console.error("Error filtering data:", err);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
};

export default { getAllData, filterData };
