const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    Rating: { type: Number, required: true },
    Comment: { type: String },
    CreateAt: { type: Date, default: Date.now },
    ProductID: { type: Schema.Types.ObjectId, ref: 'Product' },
    CustomerID: { type: Schema.Types.ObjectId, ref: 'Customer' }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
