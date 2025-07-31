import { useDispatch, useSelector, } from "react-redux";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, User, UserCog, LogOut, MoveRight, ChevronRight } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ShoppingCart,Search } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState, useRef } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "../ui/input";
import { getSearchResults } from "@/store/shop/search-slice";


function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCartItems(user.id))
        }
    }, [dispatch, user?.id])



    function handleLogout() {
        dispatch(logoutUser())
    }
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black hover:cursor-pointer">
                        <AvatarFallback className="bg-black text-white font-extrabold">
                            {user?.userName?.[0]?.toUpperCase() || ''}
                        </AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>
                        Logged In as {user?.userName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={() => navigate("/shop/account")}>
                        <User className="mr-2 h-4 w-4 font-extrabold text-black" strokeWidth={2.5} /> Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4 font-extrabold text-black" strokeWidth={2.5} /> LogOut
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

}

function HeaderLeftContent({ setIsSheetOpen }) {
    const navigate = useNavigate();
    const [openCollapsible, setOpenCollapsible] = useState(null);

    const handleCollapsibleChange = (collapsibleName) => {
        setOpenCollapsible(prev => prev === collapsibleName ? null : collapsibleName);
    };

    return (
        <div>
        <div className="flex flex-col mt-20 h-150">
            <Collapsible open={openCollapsible === 'catalog'} onOpenChange={() => handleCollapsibleChange('catalog')}>
                <CollapsibleTrigger asChild>
                    <div className="flex flex-row pl-[30px] pr-[52px] pt-[11px] pb-[11px] items-center
                       justify-between text-xl hover:cursor-pointer hover:bg-gray-100">Catalog <ChevronRight className={`transform transition-transform duration-200 ${openCollapsible === 'catalog' ? 'rotate-90' : ''}`} /></div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div onClick={() => {
                        navigate('/shop/listing');
                        setIsSheetOpen(false)
                    }} className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">All Products</div>
                    <div onClick={() => {
                        navigate('/shop/oversized-t-shirts');
                        setIsSheetOpen(false)
                    }} className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">Oversized T-shirts</div>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible open={openCollapsible === 'contact'} onOpenChange={() => handleCollapsibleChange('contact')}>
                <CollapsibleTrigger asChild>
                    <div className="flex flex-row pl-[30px] pr-[52px] pt-[11px] pb-[11px] items-center
                       justify-between text-xl hover:cursor-pointer hover:bg-gray-100">Contact Us <ChevronRight className={`transform transition-transform duration-200 ${openCollapsible === 'contact' ? 'rotate-90' : ''}`} /></div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div onClick={() => {
                        navigate('/page/about');
                        setIsSheetOpen(false)
                    }} className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">About Us</div>
                    <div onClick={() => {
                        navigate('/page/contact');
                        setIsSheetOpen(false)
                    }} className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">Contact Us</div>
                    <div onClick={() => {
                        navigate('/page/refund-policy');
                        setIsSheetOpen(false)
                    }} className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">Refund Policy</div>
                    <div className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">Shipping Policy</div>
                    <div className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">Privacy Policy</div>
                    <div className="pl-[30px] pr-[52px] pb-[11px] 
                    hover:cursor-pointer hover:bg-gray-100 ">Terms & Conditions</div>
                </CollapsibleContent>
            </Collapsible>
        </div>
        <div className="flex flex-row pl-[30px] pr-[52px] pb-[11px]">
        <HeaderRightContent />
        </div>
        </div>
    )
}


function ShoppingHeader() {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchContainerRef = useRef(null);;
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchVisible(false);
            }
        }

        if (isSearchVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchVisible]);

    return (
        <header
            className={`sticky top-0 z-40 w-full bg-background flex flex-row justify-between items-center transition-transform duration-300 ${show ? "transform-none" : "-translate-y-full"
                }`}
        >
            <div className="flex h-20 items-center px-4 justify-between md:px-6">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className="hover:cursor-pointer" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu header</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-100 max-w-xs">
                        <HeaderLeftContent setIsSheetOpen={setIsSheetOpen} />

                    </SheetContent>
                </Sheet>
            </div>
            <div className="h-17 w-50 pt-2 ">
                <span className="h-full w-full"><img className="cursor-pointer"
                    onClick={() => navigate("/shop/home")} src="/assets/GENZVERSE.png" alt="GENZVERSE Logo" /></span>
            </div>
            <div className="flex h-20 items-center px-4 justify-between md:px-6 gap-4">
                <Search className="h-6 w-6 cursor-pointer" onClick={() => setIsSearchVisible(true)} />
                <div className="hidden lg:block"><HeaderRightContent /></div>
                <Sheet>
                    <Link to="/shop/cart">
                        <Button className="hover:cursor-pointer" variant="outline" size="icon">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="sr-only">User Cart</span>
                        </Button>
                    </Link>
                </Sheet>
            </div>
            {isSearchVisible && (
                <div ref={searchContainerRef} className="absolute top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/2 p-2 border-2 border-black rounded-md"
                        value={keyword}
                        name="keyword"
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                navigate(`/shop/search?query=${e.target.value}`);
                                setIsSearchVisible(false);
                            }
                        }}
                    />
                    <button onClick={() => setIsSearchVisible(false)} className="absolute top-4 right-4 text-3xl">&times;</button>
                </div>
            )}
        </header >
    )
}


export default ShoppingHeader;
