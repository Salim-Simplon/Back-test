
const express = require("express");
const router = express.Router();
const products_control = require("../control/products_control");


router.get("/", products_control.get_all);
router.get("/:id", products_control.get_one_by_id);

router.post("/", products_control.post_one);

router.put("/:id", products_control.put_one_by_id);

router.delete("/:id", products_control.delete_one_by_id);


module.exports = router;