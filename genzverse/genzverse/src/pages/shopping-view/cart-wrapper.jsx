import { useSelector, useDispatch, } from "react-redux";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { updateCartQuantity, deleteCartItem, fetchCartItems } from "@/store/shop/cart-slice";
import { useEffect, } from "react";
import { useNavigate, } from "react-router-dom";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { toast } from "sonner";

// Helper function to create a URL-friendly slug
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
function CartPage() {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.shoppingCart)
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
      dispatch(fetchAllFilteredProducts({}));
    }
  }, [dispatch, user?.id]);
  const handleQtyChange = (productId, newQty, size) => {
    const product = productList.find(p => p._id === productId);
    if (product && newQty > product.stock) {
      toast.error("Out of stock");
      return;
    }
    if (newQty >= 1) {
      dispatch(updateCartQuantity({ userId: user.id, productId, quantity: newQty }));
    } else {
      dispatch(deleteCartItem({ userId: user.id, productId, size }));
    }
  };

  const handleRemoveItem = (productId, size) => {
    dispatch(deleteCartItem({ userId: user.id, productId, size }));
  };

  const totalAmount = (cart?.items || []).reduce(
    (total, item) => total + item.quantity * (item.salePrice || item.price),
    0
  );
  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="flex justify-between items-baseline mb-6 border-b pb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Your cart</h1>
          <Link to="/shop/home" className="text-sm font-medium text-gray-700 hover:text-black underline">
            Continue shopping
          </Link>
        </div>
        {!cart || cart.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Your cart is currently empty.</p>
          </div>
        ) : (
          <div>
            {/* Column Headers - Desktop only */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-xs uppercase text-gray-500 font-light mb-4">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            {/* Cart Items List */}
            <div className="divide-y divide-gray-200">
              {cart?.items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="py-6 grid grid-cols-12 gap-4 items-center ">

                  {/* Product Info */}
                  <div className="col-span-12 md:col-span-6 flex gap-4">
                    <Link to={`/shop/product/${item.productId}/${createSlug(item.title)}`}>
                      <img src={item.image} alt={item.title} className="w-40 h-50 object-cover rounded-md" />
                    </Link>
                    <div>
                      <Link to={`/shop/product/${item.productId}/${createSlug(item.title)}`}>
                        <p className="font-medium text-gray-800 hover:text-gray-600">{item.title}</p>
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: {item.size}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Rs. {(item.salePrice || item.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="col-span-8 sm:col-span-6 md:col-span-3 flex md:justify-center">
                    <div className="flex border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQtyChange(item.productId, item.quantity - 1, item.size)}
                        className={`hover:cursor-pointer px-3 py-1 text-gray-500 hover:text-black transition mt-0 ${item.quantity === 1 ? 'cursor-not-allowed' : ''}`}
                        disabled={item.quantity === 1}
                      >
                        <Minus className="w-4 h-4 mt-0" />
                      </button>
                      <span className="px-4 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => handleQtyChange(item.productId, item.quantity + 1, item.size)} className="hover:cursor-pointer px-3 py-1 text-gray-500 hover:text-black transition mt-0">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => handleRemoveItem(item.productId, item.size)} className="ml-4 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Line Item Total */}
                  <div className="col-span-4 sm:col-span-6 md:col-span-3 text-right">
                    <p className="font-medium text-gray-800">
                      Rs. {(item.quantity * (item.salePrice || item.price)).toLocaleString("en-IN")}
                    </p>
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="mt-8 flex flex-col items-center lg:items-end">
              <div className="flex justify-between w-full max-w-xs">
                <span className="text-lg font-medium text-gray-800">Estimated total</span>
                <span className="text-lg font-medium text-gray-900">Rs. {totalAmount.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-light">
                Taxes included. Discounts and shipping calculated at checkout.
              </p>
              <button onClick={()=> navigate("/shop/checkout")} className="hover:cursor-pointer w-full max-w-xs mt-6 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

export default CartPage
