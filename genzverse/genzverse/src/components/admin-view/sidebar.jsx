import { Fragment } from "react";
import { ChartNoAxesCombined, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";



export const adminSidebarItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icons: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icons: <ShoppingCart />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icons: <BadgeCheck />
    }

]



function MenuItems({setOpen }) {

    const navigate = useNavigate();

    return (
        <nav className="mt-8 flex-col flex gap-2">
            {
                adminSidebarItems.map((menuitems) =>
                    <div key={menuitems.id} onClick={() => {
                        navigate(menuitems.path);
                        if (setOpen) setOpen(false); // Close the sidebar if setOpen is provided
                    }}
                        className="flex items-center gap-2 rounded-md px-3 py-2
                         text-muted-foreground hover:bg-accent hover:text-accent-foreground 
                         transition-colors cursor-pointer">
                        {menuitems.icons}
                        <span>{menuitems.label}</span>
                    </div>)
            }
        </nav>
    )
}

function AdminSidebar({open, setOpen}) {
    const navigate = useNavigate();
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                        <SheetTitle className="flex items-center mt-5">
                            <ChartNoAxesCombined size={30} />
                            <span className="text-xl font-extrabold ml-2">
                                Admin Panel
                            </span>
                        </SheetTitle>
                        </SheetHeader>
                       <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
               
            </Sheet>

            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate("/admin/dashboard")}
                    className="flex cursor-pointer items-center gap-2">
                    <ChartNoAxesCombined size={30} />
                    <h1 className="text-xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}


export default AdminSidebar;
