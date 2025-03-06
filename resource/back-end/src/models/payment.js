const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    PaymentMethod: { type: String, required: true },
    PaymentDate: { type: Date, default: Date.now },
    PaymentStatus: { type: String, required: true },
    OrderID: { type: Schema.Types.ObjectId, ref: 'Order' }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
