import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults } from '@/store/shop/search-slice';
import ProductTile from '@/components/shopping-view/product-tile';
import ProductFilter from '@/components/shopping-view/filter';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.shopSearch);
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const sortBy = searchParams.get('sortBy');

  useEffect(() => {
    if (query) {
      dispatch(getSearchResults({ keyword: query, category, subcategory, sortBy }));
    }
  }, [query, category, subcategory, sortBy, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[20px] md:text-2lg lg:text-3xl font-bold text-left mb-8 sm:ml-8 md:ml-8 lg:ml-10 ">Showing results for "{query}"</h1>
      <ProductFilter productCount={searchResults.length} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 m-0 sm:m-9 sm:gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <ProductTile key={product._id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
