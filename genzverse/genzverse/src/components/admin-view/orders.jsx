import { Card, CardHeader, CardTitle } from "../ui/card"
import { CardContent } from "../ui/card"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "../ui/table"
import { Button } from "../ui/button"
import { Dialog } from "../ui/dialog"
import { use, useState } from "react"
import AdminDetailsView from "./order-details"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllOrdersForAdmin, resetAdminOrderDetails } from "@/store/admin/order-slice"
import { Badge } from "../ui/badge"
import { getOrderDetailsForAdmin } from "@/store/admin/order-slice"





function AdminOrdersView() {

    const [openDetailsDailog, setOpenDetailsDailog] = useState(false);
    const { orderList, orderDetails } = useSelector(state => state.adminOrder)
    const dispatch = useDispatch()


    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId))
    }


    useEffect(() => {
        dispatch(getAllOrdersForAdmin())
    }, [dispatch])

    console.log(orderDetails, "orderList")

    useEffect(() => {
        if (orderDetails !== null) {
            setOpenDetailsDailog(true)
        }
    }, [orderDetails])
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
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
                                                    dispatch(resetAdminOrderDetails())
                                                }}
                                            >
                                                <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                                <AdminDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView