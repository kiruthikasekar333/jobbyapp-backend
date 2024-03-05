const connection = require("../helper/db");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../config/config");

module.exports = {
  
  // to post jobs by verifyEmployer middleware
  postJob: (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log("token:", token);
    const decoded = jwt.verify(token, ACCESS_TOKEN);
    console.log("decoded:", decoded);
    const userId= decoded.userId
    console.log("userId while creating job:", userId)

    const {
      company_name,
      job_role,
      job_type,
      location,
      skills,
      salary,
      responsibilities,
      experience,
      about_job,
      about_company,
      } = req.body;


       // to upload Company_Logo
    if (!req.file) {
      return res
        .status(400)
        .send({ message: "Please upload a Company Logo" });
    }
// this variable holds userImage file, so values is directly written using this variable
    const company_logo= req.file.filename;


    // Store the values in an array
    const values = [
      userId,
      company_logo,
      company_name,
      job_role,
      job_type,
      location,
      skills,
      salary,
      responsibilities,
      experience,
      about_job,
      about_company,
    ];

    // Insert new job posting into the database
    const insertQuery = `
          INSERT INTO jobs (
            user_id,
            company_logo,
            company_name,
            job_role,
            job_type,
            location,
            skills,
            salary,
            responsibilities,
            experience,
            about_job,
            about_company 
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    connection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error posting job:", err);
        return res
          .status(500)
          .json({ message: "An error occurred while posting the job." });
      } else if (results.affectedRows > 0) {
        return res.json({ message: "Job posted successfully." });
      }
    });
  },

  // to edit jobs by verifyEmployer middleware
  editJob: (req, res) => {
    const { jobId, employerId } = req.params;

    const {
      company_name,
      job_role,
      job_type,
      location,
      skills,
      salary,
      responsibilities,
      experience,
      about_job,
      about_company,
    } = req.body;
    
    if (!req.file) {
      return res
        .status(400)
        .send({ message: "Please upload a Company Logo" });
    }
// this variable holds userImage file, so values is directly written using this variable
    const company_logo= req.file.filename;

    

    // Construct the UPDATE query with placeholders
    const updateQuery = `
          UPDATE jobs
          SET 
            company_logo = ?,
            company_name = ?,
            job_role = ?,
            job_type = ?,
            location = ?,
            skills = ?,
            salary = ?,
            responsibilities = ?,
            experience = ?,
            about_job = ?,
            about_company = ?
          WHERE job_id =?
          AND user_id = ?
        `;

        

    const values = [
      company_logo,
      company_name,
      job_role,
      job_type,
      location,
      skills,
      salary,
      responsibilities,
      experience,
      about_job,
      about_company,
      jobId,
      employerId,
    ];

    connection.query(updateQuery, values, (err, results) => {
      if (err) {
        console.error("Error updating job:", err);
        return res
          .status(500)
          .json({ message: "An error occurred while updating the job." });
      } else if (results.affectedRows > 0) {
        return res.json({ message: "Job updated successfully." , results});
        
      } else {
        return res.status(404).json({ message: "Job not found." });
      }
    });
  },

// to get jobs by verifyEmployer middleware

  getJobsByEmployerId: (req, res) => {
    const { employerId } = req.params;

// Retrieve jobs from the database for the specified employerId
    const selectQuery = `
    SELECT *
    FROM jobs
    WHERE user_id = ?
  `;

  connection.query(selectQuery, [employerId], (err, results) => {
    if (err) {
      console.error("Error fetching jobs for employer:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching jobs posted by employer." });
    } else {
      // Check if any jobs were found
      if (results.length > 0) {
        console.log(results)
        return res.json(results);
      } else {
        return res.status(404).json({ message: "No jobs found for the employer." });
      }
    }
  });
},

// delete jobbs for employer with id

deleteJob: (req, res) => {
  const { jobId, employerId } = req.params;

  // Construct the DELETE query
  const deleteQuery = `
    DELETE FROM jobs
    WHERE job_id = ? AND user_id = ?
  `;

  connection.query(deleteQuery, [jobId, employerId], (err, results) => {
    if (err) {
      console.error("Error deleting job:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the job." });
    } else if (results.affectedRows > 0) {
      return res.json({ message: "Job deleted successfully." });
    } else {
      return res.status(404).json({ message: "Job not found." });
    }
  });
},

// get all jobs for logged in users

getAllJobs: (req, res) => {
  // Construct the SELECT query
  const selectQuery = `
    SELECT *
    FROM jobs
  `;

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching jobs." });
    } else {
      return res.json(results);
    }
  });
},

getJobsByJobId: (req, res) => {
  const { jobId } = req.params;
  const query = `SELECT * FROM jobs WHERE job_id = ?`;

  connection.query(query, [jobId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred while fetching job by JobId" });
    } else {
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Job not found for the given JobId" });
      } else {
        return res.status(200).json({
          message: "Fetched Job details successfully for JobId",
          job: results[0]
        });
      }
    }
  });
}

};
