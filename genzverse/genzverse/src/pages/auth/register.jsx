import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner"

const initialState = {
    userName: '',
    email: '',
    password: '',
}

function AuthRegister() {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate()


    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) =>{
            if(data?.payload.success) {
                toast.success(data.payload.message || 'Registration successful');
                console.log("Registration successful:", data.payload);
                navigate('/auth/login');
            }
            else {
                toast.error(data.payload.message || 'Registration failed');
                console.error("Registration failed:", data.payload);
            }
        })
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6" >
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new Account</h1>
                <p className="mt-2">Already have an account</p>
                <Link className="font-medium text-primary hover:underline"
                    to="/auth/login">Login</Link>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthRegister;