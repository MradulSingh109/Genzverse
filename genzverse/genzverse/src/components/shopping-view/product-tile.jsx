import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom";

function ProductTile({ product, height, width, allowOverflow = false }) {

    const navigate = useNavigate();
    const slug = product.title.toLowerCase().replace(/\s+/g, "-")
    return (
        <div onClick={() => navigate(`/shop/product/${product._id}/${slug}`)} className="max-w-sm cursor-pointer" style={{ width }}>
            <div className="hover:underline">
                <div className={`aspect-[3/4] bg-gray-100 shadow-sm relative ${!allowOverflow && 'overflow-hidden'}`} style={{ height }}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {
                        product?.stock === 0 ? (<Badge className="absolute top-2 right-2 bg-black">Out of Stock</Badge>)
                            : product?.stock <= 5 ? (<Badge className="absolute top-2 right-2 bg-black">
                                {`Only ${product.stock} left`}</Badge>) :
                    product.salePrice > 0 ? (
                    <Badge className="absolute top-2 right-2 bg-black">Sale</Badge>) : null
                }
                </div>
                <div className="mt-0">
                    <Link className="text-sm font-bold hover:underline block mb-0 sm:text-lg">
                        {product.title}
                    </Link>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2 mt-0 pb-4">
                <p className={`text-xs sm:text-sm font-bold ${product.salePrice > 0 ? "line-through text-gray-500" : ""}`}>
                    Rs. {Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
                {
                    product.salePrice > 0 && (
                        <p className="text-xs sm:text-sm font-bold">
                            Rs. {Number(product.salePrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default ProductTile
