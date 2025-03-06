const express = require('express');
const authRouters = require('./authRouters')
const managerRouters = require('./managerRouters')
const shopRouters = require('./shopRouters')
const customerRouters = require('./customerRouters')

const router = express.Router();

router.use('/auth', authRouters);
router.use('/manager', managerRouters);

router.use('/shop', shopRouters);
router.use('/customer', customerRouters);


module.exports = router;