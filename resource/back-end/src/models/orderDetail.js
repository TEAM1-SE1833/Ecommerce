const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
    OrderID: { type: Schema.Types.ObjectId, ref: 'Order' },
    ProductID: { type: Schema.Types.ObjectId, ref: 'Product' }
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;
