require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-route');
const shopProductsRouter = require('./routes/shop/products-route');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const adminOrderRouter = require('./routes/admin/order-routes');
const shopSearchRouter = require('./routes/shop/search-routes');

//create a database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/genzverse').then(
    () => console.log("Mongoose database connected successfully")
).catch(error => {
    console.error("Mongoose database connection failed", error);
    process.exit(1);
});

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', authRouter) // Register the auth routes
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/admin/orders', adminOrderRouter)
app.use('/api/shop/search', shopSearchRouter)

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))