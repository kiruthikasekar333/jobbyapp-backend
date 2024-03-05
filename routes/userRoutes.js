const express = require("express");
const router= express.Router();
const multer = require("multer");
const userController= require("../controllers/userController");
const upload = require("../config/multerConfig")


  router.post("/registerUser",upload.single("userImage"), userController.registerUser);
  router.post("/loginUser",userController.loginUser);

module.exports=router;