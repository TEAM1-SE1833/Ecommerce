const Product = require('../models/product');
const ProductImage = require('../models/productImage');
const Shop = require('../models/shop');

// 📌 Create Shop
exports.createShop = async (req, res) => {
    try {
        const { ShopName, Address, Phone } = req.body;

        const newShop = new Shop({
            ShopName,
            Address,
            Phone,
            UserID: req.user.userId
        });

        await newShop.save();
        res.status(201).json({ msg: 'Shop created successfully', shop: newShop });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Get All Shops
exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate('UserID', 'UserName Email');
        res.status(200).json(shops);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Get Shop By ID
exports.getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id).populate('UserID', 'UserName Email');
        if (!shop) return res.status(404).json({ msg: 'Shop not found' });

        res.status(200).json(shop);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Update Shop
exports.updateShop = async (req, res) => {
    try {
        const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedShop) return res.status(404).json({ msg: 'Shop not found' });

        res.status(200).json({ msg: 'Shop updated successfully', shop: updatedShop });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Delete Shop
exports.deleteShop = async (req, res) => {
    try {
        const deletedShop = await Shop.findByIdAndDelete(req.params.id);

        if (!deletedShop) return res.status(404).json({ msg: 'Shop not found' });

        res.status(200).json({ msg: 'Shop deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};


// exports.createProduct = async (req, res) => {
//     try {
//         const { ProductName, Description, Price, StockQuantity, CategoryID } = req.body;
//         const newProduct = new Product({
//             ProductName, Description, Price, StockQuantity, ShopID: req.user.shopId, CategoryID
//         });
//         await newProduct.save();
//         res.status(201).json({ msg: 'Product created successfully' });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// };

// exports.addProductImage = async (req, res) => {
//     try {
//         const { ProductID, ImageURL } = req.body;
//         const newProductImage = new ProductImage({
//             ProductID, ImageURL
//         });
//         await newProductImage.save();
//         res.status(201).json({ msg: 'Product image added successfully' });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// };
