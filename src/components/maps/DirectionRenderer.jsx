// components/map/DirectionsRenderer.jsx
import { DirectionsRenderer as GoogleDirectionsRenderer } from '@react-google-maps/api';

export const DirectionsRenderer = ({ directions }) => {
    return directions ? <GoogleDirectionsRenderer directions={directions} /> : null;
};
