const express = require("express");
const { getPermissions, createPermission, updatePermission, deletePermission, getPermission } = require("../controllers/permissionController");

const router = express.Router();

router.get('/', getPermissions);
router.get('/:id', getPermission);
router.post('/', createPermission);
router.put('/:id', updatePermission);
router.delete('/:id', deletePermission);


module.exports = router;