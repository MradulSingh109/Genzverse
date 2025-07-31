

const Product = require("../../models/products");

const getFilterProducts = async (req, res) => {
    try {
        let { category = [], subcategory = [], sortBy = "lowtohigh" } = req.query;

        const categoryArray = Array.isArray(category)
            ? category
            : category.split(',').filter(Boolean);
            
        const subcategoryArray = Array.isArray(subcategory)
            ? subcategory
            : subcategory.split(',').filter(Boolean);

        let filters = {};
        if (categoryArray.length > 0) {
            filters.category = { $in: categoryArray };
        }
        if (subcategoryArray.length > 0) {
            filters.subcategory = { $in: subcategoryArray };
        }

        let sort = {};
        switch (sortBy) {
            case "lowtohigh":
                sort.price = 1;
                break;
            case "hightolow":
                sort.price = -1;
                break;
            default:
                sort.price = 1;
        }

        const products = await Product.find(filters).sort(sort);

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (e) {
        console.error("Error in getFilterProducts:", e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getProductsDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id);

        if (!products) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: products });
    } catch (e) {
        console.error("Error in getProductsDetails:", e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { getFilterProducts, getProductsDetails };
