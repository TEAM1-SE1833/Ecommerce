const mongoose = require('mongoose');
const Product = require('../models/product.js');
const Shop = require('../models/shop.js');
const Category = require('../models/category.js');

// Get product details
const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('ShopID', 'ShopName Address Phone')
            .populate('CategoryID', 'CategoryName Image');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Get product details successfully',
            data: product
        });
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('ShopID', 'ShopName Address Phone')
            .populate('CategoryID', 'CategoryName Image');

        return res.status(200).json({
            message: 'Get products successfully',
            data: products
        });
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        return res.status(201).json({
            message: 'Product created successfully',
            data: newProduct
        });
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }
};

module.exports = {
    getProductDetail,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
