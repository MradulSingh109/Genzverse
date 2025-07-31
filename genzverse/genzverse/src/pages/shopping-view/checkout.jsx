import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/store/shop/cart-slice";
import Address from "@/components/shopping-view/address";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";


function Checkout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.shoppingCart);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { approvalUrl } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  console.log(cart, currentSelectedAddress);

  const totalAmount = (cart?.items || []).reduce(
    (total, item) => total + item.quantity * (item.salePrice || item.price),
    0
  );


  function handleInitiatePaypalPayment() {

    if(cart?.items?.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!currentSelectedAddress) {
      toast.error("Please select an address");
      return;
    }


    const orderData = {
      userId: user.id,
      cartId: cart?._id,
      cartItems: cart?.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
        size: singleCartItem?.size
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: ''
    }

    console.log(orderData);
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, 'mradul')
      if (data?.payload?.success) {
        setIsPaymentStart(true)

      } else {
        setIsPaymentStart(false)
      }
    })
  }

  useEffect(() => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  }, [approvalUrl]);

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div>
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
          {cart?.items && cart?.items.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {cart?.items.map((item) => (
                <li key={item._id} className="py-4 flex">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-lg font-medium">
                        {item?.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item?.description}
                      </p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                      <div className="flex">
                        <p className="font-medium">
                          ₹{(item.quantity * (item.salePrice || item.price)).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="felx flex-row text-end">
            <span className="text-lg font-medium text-gray-900">Total - ₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleInitiatePaypalPayment} className="w-30">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
