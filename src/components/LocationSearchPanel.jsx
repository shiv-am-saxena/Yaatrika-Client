import { MapPin } from 'lucide-react'
import React from 'react'

export default function LocationSearchPanel() {
    return (
        <div className='h-full w-full px-5 space-y-2'>
            <div className='border border-neutral-200 w-full p-2 rounded-lg text-white flex space-x-2 hover:bg-accent'>
                <div className='w-fit flex flex-col items-center whitespace-nowrap'>
                    <MapPin className='text-sm rounded-full' />
                    <span className='text-sm'>4.2 mi</span>
                </div>

                <div className='flex flex-col items-start flex-1 overflow-hidden'>
                    <h4 className="text-white text-ellipsis whitespace-nowrap overflow-hidden">
                        Rani Laxmi Bai Memorial School
                    </h4>
                    <p className='text-neutral-100 text-sm text-ellipsis whitespace-nowrap overflow-hidden'>Sector-10 Main Rd, Sector 14, Indira Nagar, Lucknow</p>
                </div>
            </div>
            <div className='border border-neutral-200 w-full p-2 rounded-lg text-white flex space-x-2 hover:bg-accent'>
                <div className='w-fit flex flex-col items-center whitespace-nowrap'>
                    <MapPin className='text-sm rounded-full' />
                    <span className='text-sm'>4.2 mi</span>
                </div>

                <div className='flex flex-col items-start flex-1 overflow-hidden'>
                    <h4 className="text-white text-ellipsis whitespace-nowrap overflow-hidden">
                        Rani Laxmi Bai Memorial School
                    </h4>
                    <p className='text-neutral-100 text-sm text-ellipsis whitespace-nowrap overflow-hidden'>Sector-10 Main Rd, Sector 14, Indira Nagar, Lucknow</p>
                </div>
            </div>
            <div className='border border-neutral-200 w-full p-2 rounded-lg text-white flex space-x-2 hover:bg-accent'>
                <div className='w-fit flex flex-col items-center whitespace-nowrap'>
                    <MapPin className='text-sm rounded-full' />
                    <span className='text-sm'>4.2 mi</span>
                </div>

                <div className='flex flex-col items-start flex-1 overflow-hidden'>
                    <h4 className="text-white text-ellipsis whitespace-nowrap overflow-hidden">
                        Rani Laxmi Bai Memorial School
                    </h4>
                    <p className='text-neutral-100 text-sm text-ellipsis whitespace-nowrap overflow-hidden'>Sector-10 Main Rd, Sector 14, Indira Nagar, Lucknow</p>
                </div>
            </div>
        </div>
    )
}
