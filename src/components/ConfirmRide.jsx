import { ChevronDown, CircleDot, IndianRupee, MapPin } from 'lucide-react';
import React from 'react'
import sedan from '../assets/sedan.png';

export default function ConfirmRide(props) {
    const { setConfirmRide, setSearchDriver, setVehiclePanel } = props;
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h4 className="text-xl font-semibold text-[var(--color-text-dark)]">
                    Confirm your ride
                </h4>
                <ChevronDown
                    className="text-white text-2xl cursor-pointer"
                    onClick={() => setConfirmRide(false)}
                />
            </div>
            <img src={sedan} className='w-40 justify-self-center' alt="Searching for nearby driver" />
            <div className="w-full text-white rounded-lg p-1 flex flex-col gap-4">
                {/* Pickup Address */}
                <div className="flex items-start gap-3">
                    <MapPin className="mt-1 text-white h-5 w-5" />
                    <div>
                        <p className="font-bold text-white text-sm">562/11-A</p>
                        <p className="text-sm text-neutral-100">Kaikondrahalli, Bengaluru, Karnataka</p>
                    </div>
                </div>

                {/* Drop Address */}
                <div className="flex items-start gap-3">
                    <CircleDot className="mt-1 text-white h-5 w-5" />
                    <div>
                        <p className="font-bold text-white text-sm">Third Wave Coffee</p>
                        <p className="text-sm text-neutral-100">
                            17th Cross Rd, PWD Quarters, 1st Sector,
                            HSR Layout, Bengaluru, Karnataka
                        </p>
                    </div>
                </div>

                {/* Fare Info */}
                <div className="flex items-start gap-3">
                    <IndianRupee className="mt-1 text-white h-5 w-5" />
                    <div>
                        <p className="font-bold text-white text-sm">₹193.20</p>
                        <p className="text-sm text-neutral-100">Cash</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <button
                    onClick={() => {
                        setSearchDriver(true)
                        setConfirmRide(false)
                    }} className="p-3 w-full rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors duration-200">
                    Confirm Ride
                </button>
                <button onClick={() => {
                    setVehiclePanel(true)
                    setConfirmRide(false)
                }} className="p-3 w-full rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors duration-200">
                    Cancel Ride
                </button>
            </div>

        </>

    )
}
