const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    CartID: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    ProductID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    Quantity: { type: Number, required: true }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
