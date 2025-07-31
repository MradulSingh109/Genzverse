const { imageUploadUtils } = require("../../helpers/cloudinary");
const products = require("../../models/products");
const { find } = require("../../models/user");



const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url);

        res.json({
            success: true,
            result: result,
            message: 'Image Uploaded Successfully'
        });
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred during image upload'
        });
    }
}

//add product

const addProduct = async (req, res) => {
    try {
        const { title, description, price, category, subcategory, image, salePrice, stock, sizes } = req.body;
        const newlyCreatedProduct = new products({
            title, description, price,
            category, subcategory, image, salePrice, stock, sizes
        });

        await newlyCreatedProduct.save();
        res.status(200).json({ success: true, data: newlyCreatedProduct });
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// fetch all products

const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await products.find({});
        res.status(200).json({ success: true, data: listOfProducts });
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//edit product

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, subcategory, image, salePrice, stock, sizes } = req.body;
        let findProduct = await products.findById(id);
        if (!findProduct)
            return res.status(404).json({
                success: false, message: 'Product not found'
            });
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.price = price === '' ? 0 : price || findProduct.price;
        findProduct.category = category || findProduct.category;
        findProduct.subcategory = subcategory || findProduct.subcategory;
        findProduct.image = image || findProduct.image;
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
        findProduct.stock = stock || findProduct.stock;
        findProduct.sizes = sizes || findProduct.sizes;
        await findProduct.save();
        res.status(200).json({ success: true, data: findProduct });

    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


const deleteProduct = async (req, res) => {
    try {
        console.log("DELETE request received");
        console.log("req.params:", req.params);

        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required in the URL.' });
        }

        const deletedProduct = await products.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({ success: true, deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct }
