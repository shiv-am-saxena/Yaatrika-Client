import React from "react";
import { cn } from "../lib/utils";
import { Label } from "./ui/Label"
import { Input } from "./ui/InputBx";
import { ShineBorder } from './ui/ShineBorder'
import { Link } from "react-router-dom";
export function Signup() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    return (
        <div className="relative h-fit mx-auto w-fit overflow-hidden md:rounded-2xl">
            <ShineBorder shineColor={'#fff'} />
            <div
                className="shadow-input  w-full max-w-md rounded-none p-4  md:p-8 bg-purple-950">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to Yaatrika
                </h2>
                <form className="my-8" onSubmit={handleSubmit}>
                    <div
                        className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First name</Label>
                            <Input id="firstname" placeholder="Tyler" type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastname">Last name</Label>
                            <Input id="lastname" placeholder="Durden" type="text" />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="twitterpassword">Your twitter password</Label>
                        <Input id="twitterpassword" placeholder="••••••••" type="twitterpassword" />
                    </LabelInputContainer>

                    <button
                        type="submit"
                        className="group/btn relative block h-10 w-full rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all"
                    >
                        Sign up &rarr;
                        <BottomGradient />
                    </button>
                <p className="text-center mt-3 -mb-8 text-white">Already have an account? <Link to="/auth/login" className="text-blue-500">Sign in</Link></p>
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
