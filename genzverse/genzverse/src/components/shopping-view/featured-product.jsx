import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { Star, ShoppingCart } from "lucide-react";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function FeaturedProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productDetails, isLoading } = useSelector((state) => state.shopProducts);
    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.shoppingCart);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        dispatch(fetchProductDetails("687ba184726ec84942a5d816"));
    }, [dispatch]);

    if (isLoading || !productDetails) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    function handleAddToCart() {
        if (productDetails.stock === 0) {
            toast.error("Out of stock");
            return;
        }

        let getCartItems = cart?.items || []

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === productDetails._id && item.size === selectedSize)

            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity
                if (getQuantity + 1 > productDetails.stock) {
                    toast.error("Out of stock")
                    return
                }
            }
        }

        if (!selectedSize) {
            toast.error("Please select a size")
            return
        }

        dispatch(addToCart({
            userId: user?.id,
            productId: productDetails._id,
            quantity: 1,
            size: selectedSize
        })).then(data => {
            if (data.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success("Product added to cart");
            }
        });
    }

    console.log(productDetails)

    return (
        <div className="max-w-5xl mx-auto p-6 md: grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-60">
            <img
                src={productDetails.image}
                alt={productDetails.title}
                className="w-full h-full object-cover hover:cursor-pointer"
                onClick={() => navigate(`/shop/product/${productDetails._id}/${productDetails.slug}`)}
            />

            <div>
                <h1 className="text-3xl font-bold">{productDetails.title}</h1>
                <p className="text-muted-foreground text-sm mb-2">{productDetails.category}</p>
                <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 w-4 h-4" />
                </div>
                {productDetails.salePrice > 0 ? (
                    <>
                        <p className="text-2xl font-bold mt-4 text-black-600">
                            ₹{Number(productDetails.salePrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm line-through text-gray-500">
                            ₹{Number(productDetails.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </p>
                    </>
                ) : (
                    <p className="text-2xl font-bold mt-4">
                        ₹{Number(productDetails.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </p>
                )}

                {/* <div className="mt-6 text-base">
                    {productDetails.description ? (
                        <ul className="list-disc list-inside">
                            {productDetails.description.split('\n').map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No description available.</p>
                    )}
                </div> */}

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Select Size</h3>
                    <div className="flex gap-2 mt-2">
                        {['xs', 's', 'm', 'l', 'xl'].map((size) => (
                            <button
                                key={size}
                                onClick={() => productDetails.sizes.includes(size) && setSelectedSize(size)}
                                className={`w-10 h-10 border rounded-full flex items-center justify-center
                                    ${productDetails.sizes.includes(size)
                                        ? selectedSize === size
                                            ? 'bg-black text-white'
                                            : 'hover:bg-gray-200'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                disabled={!productDetails.sizes.includes(size)}
                            >
                                {size.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    {
                        productDetails?.stock === 0 ? <button
                            disabled
                            className=" mt-6 bg-gray-300 text-black px-4 py-2 rounded flex items-center gap-2 cursor-not-allowed"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Out of Stock
                        </button> : <button
                            onClick={handleAddToCart}
                            className="hover:cursor-pointer mt-6 bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-900 transition"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default FeaturedProduct;
