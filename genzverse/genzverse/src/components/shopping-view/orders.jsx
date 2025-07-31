
import { useSelect } from "@react-three/drei"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "../ui/table"
import ShoppingOrderDetailsView from "./order-details"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice"
import { Badge } from "../ui/badge"

function ShoppingOrders() {

    const [openDetailsDailog, setOpenDetailsDailog] = useState(false);
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { orderList, orderDetails } = useSelector((state) => state.shopOrder)

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetails(getId))
    }

    useEffect(() => {
        dispatch(getAllOrdersByUserId(user?.id))
    }, [dispatch])

    useEffect(() => {
        if (orderDetails !== null) {
            setOpenDetailsDailog(true)
        }
    }, [orderDetails])

    console.log(orderDetails, "orderList")
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Orders History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Order Price</TableHead>
                                <TableHead className="sr-only">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {
                                orderList && orderList.length > 0 ?
                                    orderList.map(orderItem => <TableRow>
                                        <TableCell>#{orderItem?._id}</TableCell>
                                        <TableCell>
                                            <Badge className={`py-1 px-3 
                                                    ${orderItem?.orderStatus === 'confirmed'
                                                    ? 'bg-green-500'
                                                    : orderItem?.orderStatus === 'rejected' ? 'bg-red-500' : 'bg-black'}`}>
                                                {orderItem?.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                        <TableCell>₹{orderItem?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog open={openDetailsDailog}
                                                onOpenChange={() => {
                                                    setOpenDetailsDailog(false)
                                                    dispatch(resetOrderDetails())
                                                }}>
                                                <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                                <ShoppingOrderDetailsView orderDetails={orderDetails} />
                                            </Dialog>

                                        </TableCell>
                                    </TableRow>)
                                    : null
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default ShoppingOrders