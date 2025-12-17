const express = require("express");
const {
    createOrUpdatePatientProfile,
    getPatientProfile,
    getAllPatients,
    getPatientById,
    updateMedicalInfo,
    updateEmergencyContact,
    deletePatientProfile
} = require("../controllers/patientController");

const router = express.Router();

router.post("/profile", createOrUpdatePatientProfile);  
router.get("/profile", getPatientProfile);              
router.put("/medical-info", updateMedicalInfo);         
router.put("/emergency-contact", updateEmergencyContact); 

router.get("/", getAllPatients);                        
router.get("/:id", getPatientById);                     
router.delete("/:id", deletePatientProfile);            

module.exports = router;
