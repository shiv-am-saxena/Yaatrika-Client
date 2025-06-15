import { ChevronDown, User2 } from 'lucide-react';
import sedan from '../assets/sedan.png';
import auto from '../assets/auto.png';
import premier from '../assets/premier.png';
import bike from '../assets/bike.png';
export default function VehicalPanel(props) {
    const { setVehiclePanel, setConfirmRide } = props; 
    const vehicalList = [
        {
            img: sedan,
            label: 'Prime Sedan',
            seats: 4,
            time: '10 mins away',
            desc: 'Affordable, Premium Ride',
            fare: '250.20',
        },
        {
            img: auto,
            label: 'Auto',
            seats: 2,
            time: '5 mins away',
            desc: 'Affordable, Compact Ride',
            fare: '98.20',
        },
        {
            img: bike,
            label: 'Bike',
            seats: 1,
            time: '2 mins away',
            desc: 'Affordable, Compact Ride',
            fare: '52',
        },
        {
            img: premier,
            label: 'Sedan',
            seats: 4,
            time: '2 mins away',
            desc: 'Affordable, Premium Ride',
            fare: '198.20',
        },
    ]
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

            {vehicalList.map(({ img, label, seats, time, desc, fare }, index) => (
                <div
                    key={index} onClick={()=> {
                        setConfirmRide(true)
                        setVehiclePanel(false)
                    }}
                    className="flex items-center justify-between w-full rounded-xl border border-neutral-200 bg-primary p-3 shadow-sm hover:bg-accent transition"
                >
                    {/* Left: Vehicle Image */}
                    <div className="flex-shrink-0">
                        <img src={img} alt={label} className="h-10 w-12 object-contain" />
                    </div>

                    {/* Middle: Vehicle Info */}
                    <div className="flex flex-col flex-grow px-3 overflow-hidden">
                        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-100 truncate">
                            {label}
                            <User2 className="h-4 w-4 text-neutral-100" />
                            <span className="text-neutral-100">{seats}</span>
                        </div>
                        <p className="text-xs text-neutral-100">{time}</p>
                        <p className="text-xs text-neutral-200 truncate">{desc}</p>
                    </div>

                    {/* Right: Fare */}
                    <div className="text-sm font-semibold text-neutral-100 whitespace-nowrap px-1">
                        ₹{fare}
                    </div>
                </div>
            ))
            }
        </>
    )
}
