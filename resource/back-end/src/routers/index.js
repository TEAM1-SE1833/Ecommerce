const express = require('express');
const authRouters = require('./authRouters')
const shopRouters = require('./shopRouters')
const voucherRouter = require('./voucherRouters');
const productImageRouter = require('./productImageRouters')

const router = express.Router();

router.use('/auth', authRouters);
router.use('/productImage', productImageRouter);

router.use('/shop', shopRouters);
router.use('/vouchervoucher', voucherRouter);


module.exports = router;