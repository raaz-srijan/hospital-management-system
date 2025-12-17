const express= require("express");
const { createRole, getRoles, getRoleById, deleteRole, updateRole } = require("../controllers/roleController");

const router = express.Router();


router.post("/", createRole);
router.get("/", getRoles);
router.get("/:id", getRoleById);
router.delete("/:id", deleteRole);
router.put("/:id", updateRole);


module.exports = router;