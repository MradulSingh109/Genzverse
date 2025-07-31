
import { Copyright } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Footer() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col ml-8 md:items-center justify-center gap-4 mt-6 mb-15">
                <div>
                    <h2 className="text-xl font-medium">Quick links</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 text-muted-foreground text-sm">
                    <div onClick={() => navigate('/page/about')} className="hover:cursor-pointer hover:underline">About Us</div>
                    <div onClick={() => navigate('/page/contact')} className="hover:cursor-pointer hover:underline">Contact Us</div>
                    <div onClick={() => navigate('/page/refund-policy')} className="hover:cursor-pointer hover:underline">Refund Policy</div>
                    <div className="hover:cursor-pointer hover:underline">Shipping Policy</div>
                    <div className="hover:cursor-pointer hover:underline">Privacy Policy</div>
                    <div className="hover:cursor-pointer hover:underline">Terms & Conditions</div>
                </div>
            </div>
            <div className="flex flex-row mb-10 items-center justify-center gap-2 text-muted-foreground text-xs font-semibold">
                <Copyright size={10} /> 2025, Genzverse
            </div>
        </div>

    )
}

export default Footer
