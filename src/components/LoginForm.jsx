import React from "react";
import { cn } from "../lib/utils";
import { Label } from "./ui/Label";
import { Input } from "./ui/InputBx";
import { ShineBorder } from "./ui/ShineBorder";
import { Link } from "react-router-dom";

export function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="relative h-full mx-auto w-fit overflow-hidden md:rounded-2xl">
            <ShineBorder shineColor="#fff" />

            {/* Login Card */}
            <div className="shadow-input w-md max-w-md rounded-none p-4 md:p-8 bg-purple-950">
                <h2 className="text-xl font-bold text-white">
                    Welcome to Yaatrika
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                    </LabelInputContainer>

                    {/* Password Field */}
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" />
                    </LabelInputContainer>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="group/btn relative block h-10 w-full rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all"
                    >
                        Sign in &rarr;
                        <BottomGradient />
                    </button>

                    {/* Switch to Register Link */}
                    <p className="text-center mt-4 text-sm text-white">
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="text-blue-400 hover:underline">
                            Create One
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

/* Bottom shine under button */
const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

/* Label and Input wrapper */
const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
