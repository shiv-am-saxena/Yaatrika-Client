import { Link } from 'react-router-dom'
import React from 'react'
import { Share2, Shield } from 'lucide-react'

export default function RidePanel() {
    return (
        <div className='max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] bg-primary/80 flex flex-col justify-between'>
            <div className="max-h-1/2 h-full w-full bg-green-200">
                <img
                    src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
                    alt="City ride background"
                    className="h-full"
                />
            </div>
            <div className="h-full w-full bg-primary p-4">
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

                        <Link to={'/user/payment'} onClick={() => {
                        }} className="p-3 w-full text-center rounded-lg font-semibold text-white bg-[#9058c5] hover:bg-[#8464a1] active:bg-[#51366b] transition-colors duration-200">
                            Pay Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
