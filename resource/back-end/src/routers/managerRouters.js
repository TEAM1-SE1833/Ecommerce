const express = require('express');
const { createShop, createVoucher } = require('../controllers/managerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/shop', authMiddleware(['manager']), createShop);
router.post('/voucher', authMiddleware(['manager']), createVoucher);

module.exports = router;
