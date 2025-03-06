const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    CustomerName: { type: String, required: true },
    Address: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    UserID: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
