const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const shopController = require('../controllers/shopController');

router.post('/',authMiddleware(['Manager']), shopController.createShop);
router.get('/',authMiddleware(['Manager']), shopController.getAllShops);
router.get('/:id',authMiddleware(['Manager']), shopController.getShopById);
router.put('/:id',authMiddleware(['Manager']), shopController.updateShop);
router.delete('/:id',authMiddleware(['Manager']), shopController.deleteShop);

module.exports = router;
