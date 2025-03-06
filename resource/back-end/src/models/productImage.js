const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImageSchema = new Schema({
    ImageURL: { type: String, required: true },
    ProductID: { type: Schema.Types.ObjectId, ref: 'Product' }
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);
module.exports = ProductImage;
