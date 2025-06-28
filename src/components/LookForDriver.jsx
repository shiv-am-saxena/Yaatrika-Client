import { ChevronDown, CircleDot, IndianRupee, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function LookForDriver(props) {
    const { setSearchDriver, setWaitingForDriver, confirm } = props;
    const timerRef = useRef(null);
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setWaitingForDriver(true);
            setSearchDriver(false);
        }, 5000);
        return () => clearTimeout(timerRef.current);
    }, [setSearchDriver, setWaitingForDriver])

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h4 className="text-xl font-semibold text-[var(--color-text-dark)]">
                    Confirm your ride
                </h4>
            </div>
            <img src={confirm.vehicle.img} className='w-40 justify-self-center' alt="Searching for nearby driver" />
            <div className="w-full text-white rounded-lg p-1 flex flex-col gap-4">
                {/* Pickup Address */}
                <div className="flex items-start gap-3">
                    <MapPin className="mt-1 text-white h-5 w-5" />
                    <div>
                        <p className="font-bold text-white text-sm">{confirm.pickup}</p>
                    </div>
                </div>

                {/* Drop Address */}
                <div className="flex items-start gap-3">
                    <CircleDot className="mt-1 text-white h-5 w-5" />
                    <div>
                        <p className="font-bold text-white text-sm">{confirm.destination}</p>
                    </div>
                </div>

                {/* Fare Info */}
                <div className="flex items-start gap-3">
                    <IndianRupee className="mt-1 text-white h-5 w-5" />
                    <div>
                        <p className="font-bold text-white text-sm">{confirm.vehicle.fare}</p>
                    </div>
                </div>
                <button onClick={() => {
                    setSearchDriver(false)
                    clearTimeout(timerRef.current);
                }} className="p-3 w-full rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors duration-200">
                    Cancel Ride
                </button>
            </div>

        </>

    )
}
