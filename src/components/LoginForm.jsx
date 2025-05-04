import React from "react";
import { cn } from "../lib/utils";
import { Label } from "./ui/Label"
import { Input } from "./ui/InputBx";
import { ShineBorder } from './ui/ShineBorder'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { showErrorToast } from "../lib/toast";
import { clearAuth, setError, setLoading, setToken, setUser } from "../context/slices/authSlice";
import axiosInstance from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
export function Login() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const registerHandler = async (data) => {
        try {
            dispatch(setLoading(true));

            const response = await axiosInstance.post("/auth/client/login", {
                email: data.email,
                password: data.password
            });
            const res = await response.data;
            if(res.success){
                localStorage.setItem('token', res.data.token);
                dispatch(setUser(res.data.user));
                dispatch(setToken(res.data.token));
                navigate("/profile");
            }else{
                throw new Error(res.data.message)
            }
        } catch (err) {
            console.error("Login failed:", err);
            dispatch(setError(err.response.data.message || "Login failed"));
            showErrorToast(error);
            dispatch(clearAuth());
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <div className="relative h-fit mx-auto w-fit overflow-hidden md:rounded-2xl">
            <ShineBorder shineColor={'#fff'} />
            <div
                className="shadow-input w-full sm:w-md max-w-md rounded-none p-4  md:p-8 bg-purple-950">
                <h2 className="text-xl font-bold text-center text-neutral-200">
                    Welcome to Yaatrika
                </h2>
                <form className="my-8" onSubmit={handleSubmit(registerHandler)}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email", { required: true })} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                        />
                    </LabelInputContainer>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group/btn relative block h-10 w-full rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all"
                    >
                        {loading ? "Processing...": `Sign in →`}
                        <BottomGradient />
                    </button>
                    <p className="text-center mt-3 -mb-8 text-white">Don&apos;t have an account? <Link to="/auth/register" className="text-blue-500">Create One</Link></p>
                </form>

            </div>

        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span
                className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
