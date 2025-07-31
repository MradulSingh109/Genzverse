

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ['men', 'women']
    },
    subcategory: {
        type: String,
        enum: ['oversized tshirts']
    },
    sizes: [String],
    salePrice: Number,
    stock: Number
},{timestamps: true})

module.exports = mongoose.model('Product', productSchema);
