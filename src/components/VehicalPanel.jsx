import { ChevronDown, User2 } from 'lucide-react';
import sedan from '../assets/sedan.png';
import auto from '../assets/auto.png';
import premier from '../assets/premier.png';
import bike from '../assets/bike.png';
export default function VehicalPanel(props) {
    const { setVehiclePanel, setConfirmRide, fare, setVehicle } = props;
    const vehicalList = [
        {
            img: bike,
            label: 'Bike',
            seats: 1,
            time: '2 mins away',
            desc: 'Affordable, Compact Ride',
            fare: fare.bike,
        },
        {
            img: auto,
            label: 'Auto',
            seats: 2,
            time: '5 mins away',
            desc: 'Affordable, Compact Ride',
            fare: fare.auto,
        },
        {
            img: premier,
            label: 'Sedan',
            seats: 4,
            time: '10 mins away',
            desc: 'Affordable, Premium Ride',
            fare: fare.sedan,
        },
        {
            img: sedan,
            label: 'SUV',
            seats: 6,
            time: '2 mins away',
            desc: 'Affordable, Premium Ride',
            fare: fare.suv,
        },
    ]
    const handleVehicle = (vehicle) => {
        setVehicle(vehicle);
        setConfirmRide(true)
        setVehiclePanel(false)
    }
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h4 className="text-2xl font-semibold text-[var(--color-text-dark)]">
                    Select your vehicle
                </h4>
                <ChevronDown
                    className="text-white text-2xl cursor-pointer"
                    onClick={() => setVehiclePanel(false)}
                />
            </div>

            {vehicalList.map((vehicle, index) => (
                <div
                    key={index} onClick={() => {handleVehicle(vehicle)}}
                    className="flex items-center justify-between w-full rounded-xl border border-neutral-200 bg-primary p-3 shadow-sm hover:bg-accent transition"
                >
                    {/* Left: Vehicle Image */}
                    <div className="flex-shrink-0">
                        <img src={vehicle.img} alt={vehicle.label} className="h-10 w-12 object-contain" />
                    </div>

                    {/* Middle: Vehicle Info */}
                    <div className="flex flex-col flex-grow px-3 overflow-hidden">
                        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-100 truncate">
                            {vehicle.label}
                            <User2 className="h-4 w-4 text-neutral-100" />
                            <span className="text-neutral-100">{vehicle.seats}</span>
                        </div>
                        <p className="text-xs text-neutral-100">{vehicle.time}</p>
                        <p className="text-xs text-neutral-200 truncate">{vehicle.desc}</p>
                    </div>

                    {/* Right: Fare */}
                    <div className="text-sm font-semibold text-neutral-100 whitespace-nowrap px-1">
                        ₹{vehicle.fare}
                    </div>
                </div>
            ))
            }
        </>
    )
}
