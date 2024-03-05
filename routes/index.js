const express= require("express");
const router= express.Router();

const userRoutes= require("./userRoutes");
const jobRoutes = require("./jobRoutes");


router.use("/user", userRoutes);
router.use("/jobs", jobRoutes);

module.exports= router;

