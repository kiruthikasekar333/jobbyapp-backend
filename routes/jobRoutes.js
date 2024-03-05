const express = require("express");
const router= express.Router();
const jobController= require("../controllers/jobController");
const authJWT = require("../middlewares/authJWT");
const upload = require("../config/multerConfig")

  router.post("/postJobs", 
                authJWT.verifyEmployer,
                upload.single("company_logo"),
                jobController.postJob);

  router.put("/editJobs/:jobId/:employerId",              
              authJWT.verifyJobOwner,
              upload.single("company_logo"),
              jobController.editJob);

 
  router.delete("/deleteJobs/:jobId/:employerId",                   
                  authJWT.verifyJobOwner,
                  jobController.deleteJob);

 router.get("/getJobsByEmployerId/:employerId",  
                  authJWT.verifyEmployer,       
                  jobController.getJobsByEmployerId);
   

router.get("/getJobsByJobId/:jobId", 
                  authJWT.verifyJWTToken,
                 jobController.getJobsByJobId)

  router.get("/getAllJobs", 
                authJWT.verifyJWTToken,
               jobController.getAllJobs)
  

module.exports=router;      