const Category = require('../models/category');

// Lấy danh sách tất cả danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error });
    }
};

// Lấy danh mục theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error });
    }
};

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
    try {
        const { CategoryName, Image } = req.body;
        const newCategory = new Category({ CategoryName, Image });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo danh mục', error });
    }
};

// Cập nhật danh mục
exports.updateCategory = async (req, res) => {
    try {
        const { CategoryName, Image } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { CategoryName, Image },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error });
    }
};

// Xóa danh mục
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục', error });
    }
};
