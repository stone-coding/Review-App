const express = require('express');
const { create } = require('../controllers/user');
const { useValidtor, validate } = require('../middlewares/validator');


const router = express.Router();

router.post("/create",useValidtor,validate, create)

module.exports = router;