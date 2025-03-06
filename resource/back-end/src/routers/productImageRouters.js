const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/productImageController');

router.get('/product/:productId', productImageController.getProductImagesByProductId);
router.post('/', productImageController.createProductImage);
router.get('/', productImageController.getAllProductImages);
router.get('/:id', productImageController.getProductImageById);
router.put('/:id', productImageController.updateProductImage);
router.delete('/:id', productImageController.deleteProductImage);

module.exports = router;
