const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

router.post('/',authMiddleware(['Manager']), voucherController.createVoucher);
router.get('/', authMiddleware(['Manager']),voucherController.getAllVouchers);
router.get('/:id', authMiddleware(['Manager']),voucherController.getVoucherById);
router.put('/:id', authMiddleware(['Manager']),voucherController.updateVoucher);
router.delete('/:id', authMiddleware(['Manager']),voucherController.deleteVoucher);

module.exports = router;
