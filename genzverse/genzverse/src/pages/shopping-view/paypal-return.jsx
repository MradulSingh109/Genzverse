import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { capturePayment } from "@/store/shop/order-slice"
import { clearCart } from "@/store/shop/cart-slice"





function PaypalReturnPage(){

    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')


    useEffect(() =>{

        if(paymentId && payerId){
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
            dispatch(capturePayment({ paymentId, orderId, payerId })).then(data =>{
                console.log(data)
                if(data?.payload?.success){

                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/shop/payment-success'
                }
            })
        }

    },[paymentId, payerId, dispatch])
 return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Processing payment</CardTitle>
            </CardHeader>
        </Card>
    </div>
 )
}

export default PaypalReturnPage
