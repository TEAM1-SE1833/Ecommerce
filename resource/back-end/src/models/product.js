const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    ProductName: { type: String, required: true },
    Description: { type: String },
    Price: { type: Number, required: true },
    StockQuantity: { type: Number, required: true },
    ShopID: { type: Schema.Types.ObjectId, ref: 'Shop' },
    CategoryID: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
