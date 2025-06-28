import { ChevronDown, CircleDot, IndianRupee, MapPin } from 'lucide-react';
import React from 'react'
import { usePostData } from '../hooks/usePostData';
import { showErrorToast } from '../lib/toast';

export default function ConfirmRide(props) {
    const { setConfirmRide, setSearchDriver, setVehiclePanel, vehicle, pickup, destination, setConfirm } = props;
    const createRide = usePostData('/ride/create');
    const handleRide = () => {
        createRide.mutate({ origin: pickup, destination, vehicleType: vehicle.label.toLowerCase() }, {
            onSuccess: (res) => {
                if (res.success) {
                    setConfirm({ vehicle, pickup, destination });
                    setConfirmRide(false)
                    setSearchDriver(true)
                }
            },
            onError: (err) => {
                showErrorToast(err?.data?.message || "Failed to create ride.");
            }
        })
    }
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
            <img src={vehicle.img} className='w-40 justify-self-center' alt="Searching for nearby driver" />
            <div className="w-full text-white rounded-lg p-1 flex flex-col gap-4">
                {/* Pickup Address */}
                <div className="flex items-center gap-3">
                    <MapPin className="text-white h-7 w-7" />
                    <div>
                        <p className="font-bold text-white text-sm">{pickup}</p>
                    </div>
                </div>

                {/* Drop Address */}
                <div className="flex items-center gap-3">
                    <CircleDot className="mr-1 text-white h-7 w-7" />
                    <div>
                        <p className="font-bold text-white text-sm">{destination}</p>
                    </div>
                </div>

                {/* Fare Info */}
                <div className="flex items-center gap-3">
                    <IndianRupee className="text-white h-5 w-5" />
                    <div>
                        <p className="font-bold text-white text-md">{vehicle.fare}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <button
                    onClick={handleRide} className="p-3 w-full rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors duration-200">
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
