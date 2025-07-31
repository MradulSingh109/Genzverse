import ProductFilter from "@/components/shopping-view/filter"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFilteredProducts, fetchProductDetails, } from "@/store/shop/products-slice"
import ProductTile from "@/components/shopping-view/product-tile"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import ProductDetailsPage from "./productDetails"
import CartPage from "./cart-wrapper"


function ShoppingListing() {
  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector((state) => state.shopProducts)
  const [searchParams] = useSearchParams()
  const [openDetails, setOpenDetails] = useState(false)

  useEffect(() => {
    const categoryFilters = searchParams.getAll("category") // returns array
    const subcategoryFilters = searchParams.getAll("subcategory") // returns array
    const sort = searchParams.get("sortBy") || "lowtohigh"

    const filters = {}
    if (categoryFilters.length > 0) {
      filters.category = categoryFilters
    }
    if (subcategoryFilters.length > 0) {
      filters.subcategory = subcategoryFilters
    }

    dispatch(fetchAllFilteredProducts({
      filterParams: filters,
      sortParams: sort
    }))
  }, [dispatch, searchParams])

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetails(true)
  }, [productDetails])

  // console.log(productDetails)

  console.log(productList, 'product list')

  return (
    <div className="p-4">
      <ProductFilter />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 m-0 sm:m-9 sm:gap-4 ">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <ProductTile
              key={productItem.id}
              product={productItem}
              handleGetProductDetails={handleGetProductDetails} />
          ))
        ) : (
          <p className="text-muted-foreground mt-4">No products found.</p>
        )}
      </div>
    </div>
  )
}

export default ShoppingListing
