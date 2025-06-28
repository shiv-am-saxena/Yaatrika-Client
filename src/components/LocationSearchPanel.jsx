import { MapPin } from 'lucide-react'
import { useCurrentLocation } from '../hooks/useCurrentLocation'
import { usePostData } from '../hooks/usePostData';
import { showErrorToast } from '../lib/toast';

export default function LocationSearchPanel(props) {
    const { setPanelOpen, suggestions, loading, onSuggestionSelect, activeField } = props;
    const { location, error } = useCurrentLocation();
    const getLocationMutation = usePostData('/map/get-address');

    // Handler for current location button
    const handleCurrentLocation = () => {
        if (location) {
            getLocationMutation.mutate({ coords: location }, {
                onSuccess: res => {
                    if (res.success) {
                        onSuggestionSelect(res.data.address);
                    }
                },
                onError: (err) => {
                    const message = err?.response?.data?.message || "Unable to get current location";
                    showErrorToast(message);
                },
                onSettle: () => {
                    setPanelOpen(false);
                }
            })
        }
    };
    return (
        <div className='h-full w-full px-5 mb-5 space-y-2 overflow-y-auto'>
            {/* Show current location button only for pickup field */}
            {activeField === 'pickup' && (
                <button
                    type="button"
                    onClick={handleCurrentLocation}
                    className="w-full flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mb-2"
                >
                    <MapPin className="size-4" />
                    Use Current Location
                </button>
            )}
            {loading && (
                <div className="text-white text-center py-4">Loading suggestions...</div>
            )}
            {!loading && suggestions && suggestions.length > 0 && suggestions.map((locate, index) => (
                <div
                    key={index}
                    onClick={() => {
                        onSuggestionSelect(locate.name || '');
                        // setVehiclePanel && setVehiclePanel(true);
                        // setPanelOpen(true);
                    }}
                    className='border border-neutral-200 w-full p-2 rounded-lg text-white flex space-x-2 hover:bg-accent cursor-pointer'
                >
                    {/* Left: Icon + Distance */}
                    <div className='w-fit flex flex-col p-1 items-center whitespace-nowrap'>
                        <MapPin className='text-sm rounded-full' />
                        {location.distance && <span className='text-sm'>{locate.distance}</span>}
                    </div>

                    {/* Right: Name and Address (truncate handled) */}
                    <div className='flex flex-col items-start flex-1 overflow-hidden'>
                        <h4 className="text-white text-sm font-semibold truncate w-full">
                            {locate.name || locate.description}
                        </h4>
                        {locate.address && (
                            <p className='text-neutral-100 text-xs truncate w-full'>
                                {locate.address}
                            </p>
                        )}
                    </div>
                </div>
            ))}
            {!loading && (!suggestions || suggestions.length === 0) && (
                <div className="text-white text-center py-4"/>
            )}
            {/* Optionally show error if location fetch fails */}
            {activeField === 'pickup' && error && (
                <div className="text-red-400 text-xs mt-2">{error}</div>
            )}
        </div>
    )
}