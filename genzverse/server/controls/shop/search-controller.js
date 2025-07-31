const Product = require('../../models/products');

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        const { category, subcategory, sortBy } = req.query;

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({ success: false, message: 'Keyword is required' });
        }

        const regEx = new RegExp(keyword, 'i');
        let searchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { subcategory: regEx }
            ]
        };

        const filter = {};
        if (category) {
            filter.category = { $in: Array.isArray(category) ? category : [category] };
        }
        if (subcategory) {
            filter.subcategory = { $in: Array.isArray(subcategory) ? subcategory : [subcategory] };
        }

        const combinedQuery = { ...searchQuery, ...filter };

        let sortOption = {};
        if (sortBy === 'lowtohigh') {
            sortOption.price = 1;
        } else if (sortBy === 'hightolow') {
            sortOption.price = -1;
        }

        const searchResults = await Product.find(combinedQuery).sort(sortOption);
        res.status(200).json({ success: true, data: searchResults });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = { searchProducts };
