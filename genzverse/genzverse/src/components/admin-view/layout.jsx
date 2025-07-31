
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";



function AdminLayout() {

     const [opensidebar, setopensidebar] = useState(false);
    return (
        <div className="flex min-h-screen w-full">
            {/* Admin Sidebar component can be added here */}
            <AdminSidebar open={opensidebar} setOpen={setopensidebar}/>
            <div className="flex flex-1 flex-col">
                {/* Admin Header component can be added here */}
                <AdminHeader setOpen={setopensidebar} />
                <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;