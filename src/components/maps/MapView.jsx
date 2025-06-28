// components/map/MapView.jsx
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
import Marker from './Marker';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { MapPin } from 'lucide-react';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const isLatLng = (pos) =>
    pos && typeof pos.lat === 'number' && typeof pos.lng === 'number';

export default function MapView({ pickup, destination, captain, user }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const { location } = useCurrentLocation();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        mapIds: [import.meta.env.VITE_GOOGLE_MAP_ID], // Optional but clearer
        libraries: ['places', 'marker'],
    });

    useEffect(() => {
        if (loadError) {
            console.error('Google Maps load error:', loadError);
        }
    }, [loadError]);

    const center =
        isLatLng(pickup) || isLatLng(user)
            ? pickup || user
            : isLatLng(location)
                ? location
                : { lat: 28.6139, lng: 77.2090 }; // Fallback to Delhi

    if (!isLoaded) return <div className="w-full h-full bg-black" />;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
            onLoad={(map) => {
                mapRef.current = map;
                setMap(map);
            }}
            options={{
                disableDefaultUI: true,
                gestureHandling: 'greedy',
                clickableIcons: false,
            }}
        >
            {isLatLng(user) && (
                <Marker
                    map={map}
                    position={user}
                    iconUrl={'/car.png'}
                    // iconUrl="https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
                    title="You"
                />
            )}
            {isLatLng(pickup) && (
                <Marker
                    map={map}
                    position={pickup}
                    iconUrl="/icons/pickup.svg"
                    title="Pickup"
                />
            )}
            {isLatLng(destination) && (
                <Marker
                    map={map}
                    position={destination}
                    iconUrl="/icons/destination.svg"
                    title="Destination"
                />
            )}
            {isLatLng(captain) && (
                <Marker
                    map={map}
                    position={captain}
                    iconUrl={'/car.png'}
                    title="Captain"
                    rotation={0}
                />
            )}
        </GoogleMap>
    );
}
