import CommonForm from "../common/form"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { CardContent } from "../ui/card"
import { useEffect, useState } from "react"
import { addressFormControls } from "@/config"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { addNewAddress, deleteAddress, fetchAddress, editAddress } from "@/store/shop/address-slice"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"




const initialAddressFormData ={
    address : "",
    city : "",
    state : "",
    pincode : "",
    phone : "",
    notes : ""
}

function Address({isAccount, setCurrentSelectedAddress}) {

    const [formData, setFormData] = useState(initialAddressFormData)
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)
    const {addressList} = useSelector((state) => state.shopAddress)
    const [currentEditedId, setCurrentEditedId] = useState(null)

    function handleManageAddress(event) {
        event.preventDefault();

        if (!isFormValid()) {
            toast.error("Please fill all the fields")
            return
        }

        if(addressList?.length >= 3 && currentEditedId === null){
            toast.error("You can add only 3 address")
            return
        }

        currentEditedId !== null ?
        dispatch(editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData
        })).then((data) => {
            console.log(data)
            if (data?.payload?.success) {
                dispatch(fetchAddress(user?.id))
                setFormData(initialAddressFormData)
                setCurrentEditedId(null)
                toast.success("Address updated successfully")
            }
        })
        :

        dispatch(addNewAddress({
            ...formData,
            userId: user?.id,
        })).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(fetchAddress(user?.id))
                setFormData(initialAddressFormData)
                toast.success("Address added successfully")
            }
        })
    }

    function isFormValid(){
        return Object.keys(formData)
        .map((key) => formData[key].trim() !== '')
        .every((item) => item)
    }

    useEffect(() => {
        if(user?.id)
        dispatch(fetchAddress(user?.id))
    }, [dispatch, user])

    function handleDeleteAddress(getCurrentAddress) {
        console.log(getCurrentAddress)

       dispatch(deleteAddress({userId : user?.id, addressId : getCurrentAddress._id})).then((data) => {
           if(data?.payload?.success){
               dispatch(fetchAddress(user?.id))
               toast.success("Address deleted successfully")
           }
       })
    }

   function handleEditAddress(getCurrentAddress){
    setCurrentEditedId(getCurrentAddress?._id)
    setFormData({
        ...formData,
        address : getCurrentAddress?.address,
        city : getCurrentAddress?.city,
        state : getCurrentAddress?.state,    
        pincode : getCurrentAddress?.pincode,
        phone : getCurrentAddress?.phone,
        notes : getCurrentAddress?.notes

    })
   }

    return (
        <div>
            <Card>
                <div className="mb-5 p-3">
                    {isAccount ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {addressList && addressList.length > 0 &&
                                addressList.map((addressItem) => (
                                    <div key={addressItem._id} className="border p-4 rounded-lg">
                                        <p>{addressItem.address}</p>
                                        <p>{addressItem.city}, {addressItem.state} - {addressItem.pincode}</p>
                                        <p>{addressItem.phone}</p>
                                        <div className="mt-4 flex gap-2">
                                            <button onClick={() => handleEditAddress(addressItem)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                                            <button onClick={() => handleDeleteAddress(addressItem)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        addressList &&
                        addressList.length > 0 && (
                            <Select
                                onValueChange={(value) =>
                                    setCurrentSelectedAddress(
                                        addressList.find((item) => item._id === value)
                                    )
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Address" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Address</SelectLabel>
                                        {addressList.map((addressItem) => (
                                            <SelectItem
                                                value={addressItem._id}
                                                key={addressItem._id}
                                            >
                                                {addressItem.address}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    )}
                </div>
                <CardHeader>
                    <CardTitle>
                        {currentEditedId ? "Edit Address" : "Add Address"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <CommonForm
                        formControls={addressFormControls}
                        buttonText={currentEditedId ? 'Update Address' : 'Add Address'}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleManageAddress}
                        isBtnDisabled={!isFormValid()}
                        />
                </CardContent>
            </Card>
        </div>
    )
}

export default Address
