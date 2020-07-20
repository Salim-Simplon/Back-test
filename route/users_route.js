
const express = require("express");
const router = express.Router();
const users_control = require("../control/users_control");


router.get("/", users_control.get_all);
router.get("/:id", users_control.get_one_by_id);

router.post("/", users_control.post_one);

router.put("/:id", users_control.put_one_by_id);

router.delete("/:id", users_control.delete_one_by_id);


module.exports = router;