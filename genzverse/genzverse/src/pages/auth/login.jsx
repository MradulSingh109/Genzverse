import { data, Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const initialState = {
    email: '',
    password: '',
}

function AuthLogin() {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function onSubmit(event) {
        event.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            if (data.payload.success) {
                toast.success(data.payload.message);
            } else {
                toast.error(data.payload.message || 'Login failed');
            }
        })
    }


    return (
        <div className="mx-auto w-full max-w-md space-y-6" >
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Login</h1>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={'Login'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
            <div>
                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="font-medium text-primary hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthLogin