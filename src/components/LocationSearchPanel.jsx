import { MapPin } from 'lucide-react'
import React from 'react'

export default function LocationSearchPanel(props) {
    const locations = [
        {
            name: "Rani Laxmi Bai Memorial School",
            address: "Sector-10 Main Rd, Sector 14, Indira Nagar, Lucknow",
            distance: "4.2 mi",
        },
        {
            name: "City Mall Gomti Nagar",
            address: "Vibhuti Khand, Gomti Nagar, Lucknow",
            distance: "3.5 mi",
        },
        {
            name: "Hazratganj Metro Station",
            address: "MG Marg, Hazratganj, Lucknow",
            distance: "6.1 mi",
        },
        {
            name: "SGPGI Hospital",
            address: "Raebareli Rd, Lucknow",
            distance: "8.0 mi",
        },
        {
            name: "Amausi Airport",
            address: "Airport Road, Amausi, Lucknow",
            distance: "10.4 mi",
        },
        {
            name: "Amausi Airport",
            address: "Airport Road, Amausi, Lucknow",
            distance: "10.4 mi",
        }
    ];
    const { setPanelOpen, setVehiclePanel } = props;
    return (
        <div className='h-full w-full px-5 mb-5 space-y-2 overflow-y-auto'> 
            {locations.map((location, index) => (
                <div key={index} onClick={()=>{setVehiclePanel(true); setPanelOpen(false)}} className='border border-neutral-200 w-full p-2 rounded-lg text-white flex space-x-2 hover:bg-accent'>
                    {/* Left: Icon + Distance */}
                    <div className='w-fit flex flex-col items-center whitespace-nowrap'>
                        <MapPin className='text-sm rounded-full' />
                        <span className='text-sm'>{location.distance}</span>
                    </div>

                    {/* Right: Name and Address (truncate handled) */}
                    <div className='flex flex-col items-start flex-1 overflow-hidden'>
                        <h4 className="text-white text-sm font-semibold truncate w-full">
                            {location.name}
                        </h4>
                        <p className='text-neutral-100 text-xs truncate w-full'>
                            {location.address}
                        </p>
                    </div>
                </div>

            ))}

        </div>
    )
}
