import { Shield, Phone, Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/InputOtp';
import { useNavigate } from 'react-router-dom';

export default function WaitingDriver({ setWaitingForDriver }) {
    // eslint-disable-next-line no-unused-vars
    const [OTP, setOTP] = useState("123546");
    const navigate = useNavigate();
    const timer = useRef(null);
    useEffect(() => {
        timer.current = setTimeout(() => {
            navigate('/user/ride', { replace: true });
        }, 5000);

        return () => {
            clearTimeout(timer.current);
        }
    },[navigate])

    return (
        <div className="w-full h-full text-white flex flex-col p-2 space-y-6">
            {/* Top Driver Info */}
            <div className="flex items-center justify-between w-full">
                {/* Driver Profile and Car */}
                <div className="flex items-center gap-4">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Driver"
                        className="size-18 rounded-full object-cover"
                    />
                </div>

                {/* Driver + Car Info */}
                <div className="text-right">
                    <p className="text-xs uppercase">SANTH</p>
                    <h3 className="text-xl font-bold">KA15AK00-0</h3>
                    <p className="text-sm">White Suzuki S-Presso LXI</p>
                    <p className="text-sm">⭐ 4.9</p>
                </div>
            </div>

            {/* Message Input */}
            <div className="w-full flex items-center border border-white/30 rounded-full px-4 py-2 bg-white/10 shadow-sm">
                <input
                    type="text"
                    placeholder="Send a message..."
                    className="flex-grow bg-transparent text-sm text-white placeholder-white/70 focus:outline-none"
                />
                <button type="button" className="ml-2 text-white hover:text-white/90">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
                    </svg>
                </button>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-around w-full">
                <div className="flex flex-col items-center text-center">
                    <Shield className="h-6 w-6 mb-1" />
                    <p className="text-sm">Safety</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Share2 className="h-6 w-6 mb-1" />
                    <p className="text-sm">Share my trip</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Phone className="h-6 w-6 mb-1" />
                    <p className="text-sm">Call driver</p>
                </div>
            </div>

            {/* Pickup Location */}
            <div className="flex flex-col w-full mt-4 gap-1">
                <div className="flex items-start gap-2">
                    <span className="text-xl">📍</span>
                    <div>
                        <p className="font-semibold">562/11-A</p>
                        <p className="text-sm text-white/80">Kaikondrahalli, Bengaluru, Karnataka</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
                <div className="flex gap-1 items-center">
                    <span className='font-semibold text-md'>CODE:</span>
                    <InputOTP value={OTP} maxLength={6} onChange={() => { }}>
                        <InputOTPGroup className="w-full flex items-center justify-center">
                            {[...Array(6)].map((_, i) => (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className="border-white text-white text-xl caret-transparent pointer-events-none select-none"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <button onClick={() => {
                    setWaitingForDriver(false);
                    clearTimeout(timer.current);
                }} className="p-3 w-full rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors duration-200">
                    Cancel Ride
                </button>
            </div>
        </div>
    );
}
