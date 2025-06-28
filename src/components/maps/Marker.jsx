// components/map/Marker.jsx
import { useEffect } from 'react';
const isValidLatLng = (pos) =>
    pos && typeof pos.lat === 'number' && typeof pos.lng === 'number';

const Marker = ({ map, position, iconUrl, title = '' }) => {
    useEffect(() => {
        if (!map || !window.google || !isValidLatLng(position)) return;
        const marker = new window.google.maps.Marker({
            map,
            position,
            icon: {
                url: iconUrl,
                scaledSize: new window.google.maps.Size(50, 50), // Resize icon if needed
            },
            title,
        });

        return () => {
            marker.setMap(null); // Cleanup on unmount
        };
    }, [map, position.lat, position.lng, iconUrl, title, position]);

    return null;
};

export default Marker;
