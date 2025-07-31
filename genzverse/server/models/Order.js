const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId:String,
    cartItems: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
            size: String
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate:Date,
    paymentId: String,
    payerId: String
})


module.exports = mongoose.model('Order', OrderSchema);
