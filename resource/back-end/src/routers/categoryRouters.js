const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

router.post('/',authMiddleware(['Manager']), categoryController.createCategory);

router.get('/',authMiddleware(['Manager']), categoryController.getAllCategories);
router.get('/:id',authMiddleware(['Manager']), categoryController.getCategoryById);

router.put('/:id',authMiddleware(['Manager']), categoryController.updateCategory);
router.delete('/:id',authMiddleware(['Manager']), categoryController.deleteCategory);

module.exports = router;
