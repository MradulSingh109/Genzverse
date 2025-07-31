
import { DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "../ui/separator"
import CommonForm from "../common/form"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatusForAdmin } from "@/store/admin/order-slice"
import { getOrderDetails } from "@/store/shop/order-slice"
import { toast } from "sonner"

const initialFormData = {
   status: "",
}


function AdminDetailsView({orderDetails}) {

    const [formData, setFormData] = useState(initialFormData);
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    function handleUpdateStatus(event) {
        event.preventDefault();
        console.log(formData);
        const {status} = formData;

        dispatch(updateOrderStatusForAdmin({id: orderDetails?._id, orderStatus: status})).then((data) =>{
            console.log(data,"1234");
            if(data?.payload?.success){
                dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                dispatch(getAllOrdersForAdmin())
                setFormData(initialFormData)
                toast.success("Order status updated successfully");
            }
        })

    }
    return (
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6">
            <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>₹{orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge className={`py-1 px-3 
                            ${orderDetails?.orderStatus === 'confirmed' 
                            ? 'bg-green-500' 
                             : orderDetails?.orderStatus === 'rejected' ? 'bg-red-500' : 'bg-black'}`}>
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4 ">
                    <div className="grid gap-2 ">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3 ">
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                                    orderDetails?.cartItems.map(item => <li className="flex items-center justify-between" key={item._id}>
                                        <span>{item.productID ? item.productID.title : item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Size: {item.size}</span>
                                        <span>₹{item.productID ? item.productID.price : item.price}</span>
                                    </li>) : null
                            }
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4 ">
                    <div className="grid gap-2 ">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>Name: {user.userName}</span>
                            <span>Address: {orderDetails?.addressInfo?.address}</span>
                            <span>City: {orderDetails?.addressInfo?.city}</span>
                            <span>State: {orderDetails?.addressInfo?.state}</span>
                            <span>Pincode: {orderDetails?.addressInfo?.pincode} </span>
                            <span>Phone: {orderDetails?.addressInfo?.phone} </span>
                            <span>Notes: {orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: 'Order Status',
                                name: 'status',
                                componentType: 'select',

                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "rejected", label: "Rejected" },
                                    { id: "delivered", label: "Delivered" },

                                ]
                            },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleUpdateStatus}
                        buttonText="Update Order Status"
                    />
                </div>
            </div>

        </DialogContent>
    )
}

export default AdminDetailsView
