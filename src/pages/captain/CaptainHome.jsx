import { Link } from 'react-router-dom'
import React from 'react'
import { Share2, Shield } from 'lucide-react'
import MapView from '../../components/maps/MapView'
import { useCurrentLocation } from '../../hooks/useCurrentLocation'
import { useSelector } from 'react-redux'

export default function CaptainHome() {
  const { location } = useCurrentLocation();
  const { user } = useSelector(state => state.auth);
  return (
    <div className='max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] bg-primary/80 flex flex-col justify-between'>
      <div className="h-[calc(100vh-200px)] max-h-1/2 w-full bg-[var(--color-bg)]">
        <MapView
          // user={location}           // (optional) use `useCurrentLocation()` hook
          // pickup={pickupLocationObj}    // Must be { lat, lng }
          // destination={destinationObj}  // Must be { lat, lng }
          captain={location}  // (optional) for live tracking
        />
      </div>
      <div className="h-full w-full bg-primary p-4">
        <div className="w-full h-full text-white flex flex-col p-2 space-y-6">
          {/* Top Driver Info */}
          <div className="flex items-center justify-between w-full gap-4">
            {/* Driver Profile and Car */}
            <div className="flex items-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Driver"
                className="size-12 rounded-full object-cover"
              />
            </div>

            {/* Driver + Car Info */}
            <div className="w-full">
              <p className="text-md uppercase">Welcome, { user?.firstName + " " + user?.lastName }</p>
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
        </div>
      </div>
    </div>
  )
}
