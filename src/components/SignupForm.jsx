import React from "react";
import { cn } from "../lib/utils";
import { Label } from "./ui/Label";
import { Input } from "./ui/InputBx";
import { ShineBorder } from "./ui/ShineBorder";
import { Link, useNavigate } from "react-router-dom";
import { showErrorToast, showInfoToast, showSuccessToast } from "../lib/toast";
import { clearAuth, setError, setLoading, setToken, setUser } from "../context/slices/authSlice";
import axiosInstance from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/InputOtp";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/Select";

export function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [countryCode, setCountryCode] = React.useState("");
    const [isVerified, setIsVerified] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [clicks, setClicks] = React.useState(0);

    const countries = [
        { id: "+1", name: "United States" },
        { id: "+44", name: "United Kingdom" },
        { id: "+61", name: "Australia" },
        { id: "+91", name: "India" },
        { id: "+49", name: "Germany" },
        { id: "+33", name: "France" },
        { id: "+81", name: "Japan" },
        { id: "+86", name: "China" },
        { id: "+55", name: "Brazil" },
        { id: "+93", name: "Afghanistan" },
        { id: "+355", name: "Albania" },
        { id: "+213", name: "Algeria" },
        { id: "+376", name: "Andorra" },
        { id: "+244", name: "Angola" },
        { id: "+54", name: "Argentina" },
        { id: "+374", name: "Armenia" },
        { id: "+43", name: "Austria" },
        { id: "+994", name: "Azerbaijan" },
        { id: "+973", name: "Bahrain" },
        { id: "+880", name: "Bangladesh" },
        { id: "+32", name: "Belgium" },
        { id: "+975", name: "Bhutan" },
        { id: "+591", name: "Bolivia" },
        { id: "+387", name: "Bosnia and Herzegovina" },
        { id: "+267", name: "Botswana" },
        { id: "+359", name: "Bulgaria" },
        { id: "+855", name: "Cambodia" },
        { id: "+237", name: "Cameroon" },
        { id: "+238", name: "Cape Verde" },
        { id: "+56", name: "Chile" },
        { id: "+57", name: "Colombia" },
        { id: "+506", name: "Costa Rica" },
        { id: "+385", name: "Croatia" },
        { id: "+53", name: "Cuba" },
        { id: "+357", name: "Cyprus" },
        { id: "+420", name: "Czech Republic" },
        { id: "+45", name: "Denmark" },
        { id: "+253", name: "Djibouti" },
        { id: "+593", name: "Ecuador" },
        { id: "+20", name: "Egypt" },
        { id: "+503", name: "El Salvador" },
        { id: "+372", name: "Estonia" },
        { id: "+251", name: "Ethiopia" },
        { id: "+358", name: "Finland" },
        { id: "+241", name: "Gabon" },
        { id: "+220", name: "Gambia" },
        { id: "+995", name: "Georgia" },
    ];

    const getOTP = async (e) => {
        e.preventDefault();

        if (!phone) {
            showErrorToast("Please enter phone number first");
            return;
        }

        if (clicks >= 5) {
            setDisabled(true);
            showInfoToast("Only 5 OTPs can be requested in 12 hours.");
            return;
        }

        try {
            dispatch(setLoading(true));
            const response = await axiosInstance.post("/auth/send-otp", { phoneNumber: phone });
            const res = response.data;
            if (res.success) {
                showSuccessToast(res.message);
                setDisabled(true);
                setTimeout(() => setDisabled(false), 30000);
                setClicks((prev) => prev + 1);
                if (import.meta.env.VITE_ENV !== "production") {
                    alert("OTP: " + res.data);
                }
            }
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to send OTP";
            console.error(err);
            showErrorToast(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axiosInstance.post("/auth/verify-otp", { phoneNumber: phone, otp });
            const res = response.data;
            if (res.success) {
                showSuccessToast(res.message);
                setIsVerified(true);
            }
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to verify OTP";
            console.error(err);
            showErrorToast(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const registerHandler = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !gender || !countryCode || !phone ) {
            showErrorToast("All fields are required");
            return;
        }
        if(!isVerified){
            showErrorToast("Verify your number first.");
            return;
        }
        try {
            dispatch(setLoading(true));
            const response = await axiosInstance.post("/auth/user/register", {
                firstName,
                lastName,
                email,
                gender,
                countryCode,
                phoneNumber: phone,
                isVerified: String(isVerified)
            });

            const res = response.data;
            if (res.success) {
                localStorage.setItem("token", res.data.token);
                showSuccessToast(res.message);
                dispatch(setUser(res.data.user));
                dispatch(setToken(res.data.token));
                navigate("/");
            }
        } catch (err) {
            const message = err?.response?.data?.message || "User registration failed";
            console.error("User registration failed:", err);
            dispatch(setError(message));
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
                <form className="my-8" onSubmit={registerHandler}>
                    <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First name</Label>
                            <Input id="firstname" placeholder="Tyler" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastname">Last name</Label>
                            <Input id="lastname" placeholder="Durden" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="num">Phone Number</Label>
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <Input
                                id="num"
                                placeholder="9513574682"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={10}
                                minLength={10}
                                readOnly={isVerified}
                                className="w-full"
                            />
                            <button
                                onClick={getOTP}
                                disabled={isVerified || disabled}
                                className="h-10 w-fit mt-0.5 px-5 text-nowrap rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all"
                            >
                                {loading ? "Processing..." : "Get OTP"}
                            </button>
                        </div>
                    </LabelInputContainer>
                    <LabelInputContainer className={`${clicks > 0 ? 'block' : 'hidden'} mb-4`}>
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-between">
                            <InputOTP value={otp} onChange={setOtp} maxLength={6} disabled={isVerified}>
                                <InputOTPGroup>
                                    {[...Array(6)].map((_, i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            className="border-white text-white text-xl"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                            <button
                                type={'button'}
                                onClick={verifyOtp}
                                disabled={isVerified}
                                className="h-10 w-full mt-0.5 px-5 text-nowrap rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all"
                            >
                                {isVerified ? "Verified" : "Verify OTP"}
                            </button>
                        </div>
                    </LabelInputContainer>
                    <div className="flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-between">
                        <LabelInputContainer className={"mb-0"}>
                            <Label htmlFor="gender">Gender</Label>
                            <Select onValueChange={setGender} id="gender">
                                <SelectTrigger className={`w-full bg-purple-500`}>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </LabelInputContainer>
                        <LabelInputContainer className={"mb-0"}>
                            <Label htmlFor="country">Country</Label>
                            <Select onValueChange={setCountryCode} id="country">
                                <SelectTrigger className={`w-full`}>
                                    <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    {countries.map((country, idx) => (
                                        <SelectItem key={idx} value={country.id}>
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </LabelInputContainer>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !isVerified}
                        className="group/btn relative block h-10 w-full rounded-md bg-purple-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:bg-purple-800 transition-all"
                    >
                        {loading ? "Processing..." : `Sign up →`}
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
