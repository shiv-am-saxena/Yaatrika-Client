import { useState, useEffect } from "react";

export const useCurrentLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        const watchId = navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            (err) => {
                setError(err.message || "Failed to get location");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return { location, error };
};
