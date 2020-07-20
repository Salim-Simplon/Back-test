
const express = require("express");
const router = express.Router();
const history_control = require("../control/history_control");


router.get("/", history_control.get_all);
router.get("/:id", history_control.get_one_by_id);

router.post("/", history_control.post_one);

router.put("/:id", history_control.put_one_by_id);

router.delete("/:id", history_control.delete_one_by_id);


module.exports = router;