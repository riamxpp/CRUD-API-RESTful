const express = require('express');
const router = express.Router();

router.get(('/'), (req, res) => {
  res.json("Hellow world");
});

module.exports = router;