const express = require('express');
const router = express.Router();

const { refreshToken } = require('../middlewares/auth');

router.post("/refresh",  refreshToken)

//


module.exports = router