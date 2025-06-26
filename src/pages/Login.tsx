import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Login = () => {



     const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: ``,
        password: ``,
    })

    const {login, isLoggingIn} = useAuthStore()


    const validateForm = () => {
        if(!formData.email.trim()){
            return toast.error("Email is required");
        }
        if(!formData.password.trim()){
            return toast.error("Password is required");
        }
        if(!/\S+@\S+\.\S+/.test(formData.email)){
            return toast.error("Please enter a valid email address");
        }
        if(formData.password.length < 6){
            return toast.error("Password must be at least 6 characters long");
        }
        return true;
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const success=validateForm()

        if (success=== true) login(formData)
        

    }



    return (
        <div>
            <div>
            <div className="min-h-screen grid lg:grid-cols-2">
                <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                    <div className="w-full max-w-md space-y-8">
                        <div className=" flex flex-col items-center gap-2 group:">
                            <div className=" size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className=" text-2xl font-bold mt-2"> Login Account</h1>
                            <p className=" text-base-content/60"> Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className=" space-y-6">
                        
                        <div className="form-control">
                            <label className=" label">
                                <span className=" label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
                                    <Mail className=" size-5 text-base-content/40" />

                                </div>
                                <input type="text"
                                    className=" input input-bordered w-96 pl-10"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />


                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? 'text':'password'}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={()=>setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ):(
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                                    {
                                        isLoggingIn ? (
                                            <>
                                                <Loader2 className="size-5 animate-spin" />
                                                Loading...
                                            </>
                                        ):(
                                            "Login Account"
                                        )
                                    }
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className=" text-base-content/60">Alrady have an acconut?{''}
                        <Link to='/signup' className="link link-primary"> Sign Up</Link>
                        </p>

                    </div>
                </div>
<AuthImagePattern 
title="Welcome to Our Platform"
subTitle="Join us and start your journey with a free account today!"
/>


            </div> 
        </div>
        </div>
    );
};

export default Login;