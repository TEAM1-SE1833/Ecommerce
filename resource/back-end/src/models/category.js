const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    CategoryName: { type: String, required: true },
    Image: { type: String }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
