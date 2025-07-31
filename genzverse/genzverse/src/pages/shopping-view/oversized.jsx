import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { fetchAllFilteredProducts } from '@/store/shop/products-slice';
import ProductTile from '@/components/shopping-view/product-tile';
import ShoppingLayout from '@/components/shopping-view/layout';
import ProductFilter from '@/components/shopping-view/filter';

function OversizedTShirtsPage() {
    const dispatch = useDispatch();
    const { productList, isLoading } = useSelector((state) => state.shopProducts);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const categoryFilters = searchParams.getAll("category");
        const sort = searchParams.get("sortBy") || "lowtohigh";

        const filters = {
            subcategory: ['oversized tshirts']
        };

        if (categoryFilters.length > 0) {
            filters.category = categoryFilters;
        }

        dispatch(fetchAllFilteredProducts({
            filterParams: filters,
            sortParams: sort
        }));
    }, [dispatch, searchParams]);

    return (
            <div className="p-4">
                <h1 className="text-[20px] md:text-2lg lg:text-3xl font-bold text-left mb-8 sm:ml-8 md:ml-8 lg:ml-10 ">Oversized T-Shirts</h1>
                <ProductFilter hideSubcategory={true} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 m-0 sm:m-9 sm:gap-4 ">
                        {productList && productList.length > 0 ? (
                            productList.map((productItem) => (
                                <ProductTile key={productItem._id} product={productItem} />
                            ))
                        ) : (
                            <p className="text-muted-foreground col-span-full text-center mt-4">
                                No oversized t-shirts found.
                            </p>
                        )}
                    </div>
            </div>
    );
}

export default OversizedTShirtsPage;
