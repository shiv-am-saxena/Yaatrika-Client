import React from "react";
import { cn } from "../lib/utils";
import { Label } from "./ui/Label";
import { Input } from "./ui/InputBx";
import { ShineBorder } from './ui/ShineBorder';
import { Link } from "react-router-dom";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "./ui/InputOtp";
import { useSendOtp } from "../hooks/useSendOtp";
import { useLoginWithOtp } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { showErrorToast, showInfoToast } from "../lib/toast";

export function Login() {
    const { loading } = useSelector((state) => state.auth);

    const [disabled, setDisabled] = React.useState(false);
    const [clicks, setClicks] = React.useState(0);
    const [otp, setOtp] = React.useState("");
    const [phone, setPhone] = React.useState("");


    const otpMutation = useSendOtp({ phone, clicks, setClicks, setDisabled });
    const loginMutation = useLoginWithOtp({ phone, otp });

    const getOTP = (e) => {
        e.preventDefault();

        if (!phone) return showErrorToast("Please enter phone number first");
        if (clicks >= 5) {
            setDisabled(true);
            showInfoToast("Only 5 OTPs can be requested in 12 hours.");
            return;
        }

        otpMutation.mutate();
    };

    const registerHandler = (e) => {
        e.preventDefault();
        loginMutation.mutate();
    };


    return (
        <div className="relative h-fit mx-auto w-fit overflow-hidden md:rounded-2xl rounded-lg">
            <ShineBorder shineColor={"#fff"} />
            <div className="shadow-input w-full sm:w-md max-w-md rounded-none p-4 md:p-8 bg-purple-950">
                <h2 className="text-xl font-bold text-center text-neutral-200">
                    Welcome to Yaatrika
                </h2>
                <p className="text-center mt-3 -mb-5 text-white">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/user/register" className="text-blue-500">
                        Create One
                    </Link>
                </p>
                <form className="my-8" onSubmit={registerHandler}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="num">Phone Number</Label>
                        <div className="mb-0 flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <Input
                                id="num"
                                placeholder="9513574682"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={10}
                                className="w-full"
                            />
                            <button
                                onClick={getOTP}
                                disabled={disabled || loading}
                                className="h-10 w-full md:w-fit mt-0.5 px-5 text-nowrap rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all"
                            >
                                {loading ? "Processing..." : "Get OTP"}
                            </button>
                        </div>
                    </LabelInputContainer>

                    <LabelInputContainer className={`${clicks > 0 ? 'block' : 'hidden'} mb-4`}>
                        <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                            <InputOTPGroup className="w-full flex items-center justify-center">
                                {[...Array(6)].map((_, i) => (
                                    <InputOTPSlot
                                        key={i}
                                        index={i}
                                        className="border-white text-white text-xl"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </LabelInputContainer>

                    <button
                        type="submit"
                        disabled={loading || clicks === 0}
                        className={`group/btn  relative  h-10 w-full rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all`}
                    >
                        {loading ? "Processing..." : "Sign in →"}
                        <BottomGradient />
                    </button>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
);

const LabelInputContainer = ({ children, className }) => (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
    </div>
);
