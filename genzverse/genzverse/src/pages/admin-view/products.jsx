import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, use, useEffect } from "react";
import { useState } from "react";
import ImageUpload from "./image-upload";
import { useDispatch } from "react-redux";
import { addNewProduct, editProduct, fetchAllProducts, deleteProduct } from "@/store/admin/products-slice";
import { useSelector } from "react-redux";
import { toast } from "sonner"
import AdminProductTile from "@/components/admin-view/product-tile";




const initialFormData = {
  title: '',
  description: '',
  price: '',
  image: null,
  category: '',
  sizes: '',
  salePrice: '',
  stock: '',
}

function AdminProducts() {

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.adminProducts)
  const [currentEditedId, setCurrentEditedId] = useState(null)


  function onSubmitForm(event) {
    event.preventDefault();
    const finalFormData = {
      ...formData,
      sizes: formData.sizes.split(',').map(s => s.trim()),
    };

    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId,
        formData: finalFormData
      })).then((data) => {
        console.log(data)

        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setFormData(initialFormData)
          setCurrentEditedId(null)
          setOpenCreateProduct(false)
          toast.success("Product updated successfully")
        }
      })
      : dispatch(addNewProduct({
        ...finalFormData,
        image: uploadedImageUrl
      })).then((data) => {
        console.log(data)
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setImageFile(null)
          setFormData(initialFormData)
          setOpenCreateProduct(false) //close the sheet after adding new product successfully
          toast.success("Product added successfully")

        }
      })
  }

  function handleDelete(getCurrentProductId){
    console.log(getCurrentProductId)
    dispatch(deleteProduct({ id: getCurrentProductId })).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        console.log(productList)
        toast.success("Product deleted successfully")
      }
    })
  }

  function isFormValid() {
    if (!formData) return false; // or return true, depending on your requirements
    // console.log(formData)
    return Object.keys(formData)
      .map((key) => formData[key] !== '')
      .every((item) => item)
  }


  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])


  console.log(productList, uploadedImageUrl, "products")
  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProduct(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg-grid-cols-4">
        {
          productList && productList.length > 0 ?
            productList.map((productItem) =>
              <AdminProductTile
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProduct={setOpenCreateProduct}
                setFormData={(data) => setFormData({ ...data, sizes: data.sizes.join(', ') })}
                handleDelete = {handleDelete}
              />) : null
        }
      </div>
      <Sheet open={openCreateProduct} onOpenChange={() => {
        setOpenCreateProduct(false)
        setFormData(initialFormData)
        setCurrentEditedId(null);
      }}>
        <SheetContent side="right" className="overflow-auto" >
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? "Edit Product" : "Add New Product"
              }
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 p-[6px] ">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update Product" : "Add Product"}
              onSubmit={onSubmitForm}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts
