
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    OrderDate: { type: Date, default: Date.now },
    ShipAddress: { type: String, required: true },
    ShipDate: { type: Date },
    Total: { type: Number, required: true },
    VoucherID: { type: Schema.Types.ObjectId, ref: 'Voucher' },
    CustomerID: { type: Schema.Types.ObjectId, ref: 'Customer' }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;