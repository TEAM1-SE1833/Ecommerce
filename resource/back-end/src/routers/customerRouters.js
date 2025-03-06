const express = require('express');
const { addToCart, placeOrder, addReview } = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-to-cart', authMiddleware(['customer']), addToCart);
router.post('/order', authMiddleware(['customer']), placeOrder);
router.post('/review', authMiddleware(['customer']), addReview);

module.exports = router;
