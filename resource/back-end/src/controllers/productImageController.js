const ProductImage = require('../models/productImage');

// 📌 Create Product Image
exports.createProductImage = async (req, res) => {
    try {
        const { ImageURL, ProductID } = req.body;

        if (!ImageURL || !ProductID) {
            return res.status(400).json({ msg: 'ImageURL and ProductID are required' });
        }

        const newProductImage = new ProductImage({ ImageURL, ProductID });
        await newProductImage.save();

        res.status(201).json({ msg: 'Product Image created successfully', productImage: newProductImage });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Get All Product Images
exports.getAllProductImages = async (req, res) => {
    try {
        const productImages = await ProductImage.find().populate('ProductID', 'ProductName');
        res.status(200).json(productImages);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Get Product Image By ID
exports.getProductImageById = async (req, res) => {
    try {
        const productImage = await ProductImage.findById(req.params.id).populate('ProductID', 'ProductName');
        if (!productImage) return res.status(404).json({ msg: 'Product Image not found' });

        res.status(200).json(productImage);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Update Product Image
exports.updateProductImage = async (req, res) => {
    try {
        const { ImageURL, ProductID } = req.body;

        const updatedProductImage = await ProductImage.findByIdAndUpdate(
            req.params.id,
            { ImageURL, ProductID },
            { new: true }
        );

        if (!updatedProductImage) return res.status(404).json({ msg: 'Product Image not found' });

        res.status(200).json({ msg: 'Product Image updated successfully', productImage: updatedProductImage });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Delete Product Image
exports.deleteProductImage = async (req, res) => {
    try {
        const deletedProductImage = await ProductImage.findByIdAndDelete(req.params.id);

        if (!deletedProductImage) return res.status(404).json({ msg: 'Product Image not found' });

        res.status(200).json({ msg: 'Product Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
exports.getProductImagesByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const productImages = await ProductImage.find({ ProductID: productId });

        if (!productImages.length) {
            return res.status(404).json({ msg: 'No images found for this product' });
        }

        res.status(200).json(productImages);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};