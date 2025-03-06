const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    Code: { type: String, required: true },
    Discount: { type: Number },
    MinOrder: { type: Number },
    MaxValue: { type: Number },
    StartDate: { type: Date },
    ExpiryDate: { type: Date },
    IsActive: { type: Boolean, default: true }
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
