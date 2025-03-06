
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    ShopName: { type: String, required: true },
    Address: { type: String, required: true },
    Phone: { type: String, required: true },
    UserID: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
