const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

router.post('/',authMiddleware(['Shop']), productController.createProduct);
router.get('/',authMiddleware(['Shop']), productController.getProducts);
router.get('/:id',authMiddleware(['Shop']), productController.getProductDetail);
router.put('/:id',authMiddleware(['Shop']), productController.updateProduct);
router.delete('/:id',authMiddleware(['Shop']), productController.deleteProduct);

// router.post('/', productController.createProduct);
// router.get('/', productController.getProducts);
// router.get('/:id', productController.getProductDetail);
// router.put('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);

module.exports = router;
