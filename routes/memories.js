const express = require("express");
const memories = require("../controller/memories");
const router = express.Router();

router.get("/", memories.getAllmemories);
router.post("/create", memories.creatememories);
router.put("/update/:id", memories.updatememories);
router.get("/:id", memories.getbyId);
router.delete("/:id", memories.deletememories);
router.get("/user/:id", memories.getbyUserId);

module.exports = router;
