/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, ChevronDown, Timer, User2 } from 'lucide-react';
import LocationSearchPanel from '../../components/LocationSearchPAnel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import VehicalPanel from '../../components/VehicalPanel';
import ConfirmRide from '../../components/ConfirmRide';
import LookForDriver from '../../components/LookForDriver';
import WaitingDriver from '../../components/WaitingDriver';
import { usePostData } from '../../hooks/usePostData';
import { showErrorToast } from '../../lib/toast';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import MapView from '../../components/maps/MapView';

export default function UserHome() {
	const [pickup, setPickup] = useState('');
	const [destination, setDestination] = useState('');
	const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'
	const [panelOpen, setPanelOpen] = useState(false)
	const [leaveNow, setLeaveNow] = useState('')
	const [vehiclePanel, setVehiclePanel] = useState(false);
	const [confirmRide, setConfirmRide] = useState(false);
	const [searchDriver, setSearchDriver] = useState(false);
	const [waitingForDriver, setWaitingForDriver] = useState(false);
	const [suggestions, setSuggestions] = useState(null);
	const [loading, setLoading] = useState(false);
	const getSuggestionsMutation = usePostData('/map/get-suggestions');
	const getFareMutation = usePostData('/ride/get-fare');
	const [fare, setFare] = useState(null);
	const [vehicle, setVehicle] = useState(null);
	const [confirm, setConfirm] = useState(null);

	const {location, error} = useCurrentLocation();
	const submitHandler = (e) => {
		e.preventDefault();
		if (!pickup, !destination) {
			showErrorToast("Pickup and Desitnation Required");
			return;
		}
		setLoading(true);
		getFareMutation.mutate({ origin: pickup, destination }, {
			onSuccess: (res) => {
				if (res.success) {
					setFare(res.data.fare);
				}
			},
			onError: (err) => {
				const message = err?.response?.data?.message || "Unable to get fare";
				console.error(err);
				showErrorToast(message);
			},
			onSettled: () => {
				setVehiclePanel(true);
				setPanelOpen(false);
			}
		})
	}
	const handlePickup = (e) => {
		setPickup(e.target.value);
		setActiveField('pickup');
		setPanelOpen(true);
		if (pickup !== undefined) {
			setLoading(true)
			getSuggestionsMutation.mutate({ input: pickup }, {
				onSuccess: res => {
					if (res.success) {
						setSuggestions(res.data.suggestions)
					}
				},
				onSettled: () => {
					setLoading(false);
				}
			})
		}
	}
	const handleDestination = (e) => {
		setDestination(e.target.value);
		setActiveField('destination');
		setPanelOpen(true);
		if (pickup !== undefined) {
			setLoading(true)
			getSuggestionsMutation.mutate({ input: destination }, {
				onSuccess: res => {
					if (res.success) {
						setSuggestions(res.data.suggestions)
					}
				},
				onSettled: () => {
					setLoading(false);
				}
			})
		}
	}
	const handleSuggestionSelect = (value) => {
		if (activeField === 'pickup') {
			setPickup(value);
			setSuggestions(null);
			setActiveField('destination');

		};
		if (activeField === 'destination') {
			setDestination(value);
			setSuggestions(null);
			setActiveField(null);
		};
	};

	return (
		<div className="relative h-[calc(100vh-64px)] w-full font-montserrat">
			{/* Background GIF */}
			{/* Background Map */}
			<div className="h-[calc(100vh-300px)] max-h-screen w-full bg-[var(--color-bg)]">
				<MapView
					user={location}           // (optional) use `useCurrentLocation()` hook
					// pickup={pickupLocationObj}    // Must be { lat, lng }
					// destination={destinationObj}  // Must be { lat, lng }
					// captain={captainLocationObj}  // (optional) for live tracking
				/>
			</div>


			{/* Foreground Form Container */}
			<div className={`absolute bottom-0 ${panelOpen ? 'h-[calc(100vh-64px)]': 'h-fit'} left-0 w-full flex flex-col justify-end`}>
				<div className={`relative h-fit bg-[var(--color-primary)]/80 backdrop-blur-lg ${!panelOpen ? 'rounded-t-2xl' : 'rounded-none'} p-6 md:p-8  shadow-lg`}>
					<div className="w-full flex items-start justify-between">
						<h4 className="text-2xl font-semibold text-[var(--color-text-dark)] mb-6">
							Find a Trip
						</h4>
						<ChevronDown className={`text-white text-2xl ${!panelOpen ? 'hidden' : 'block'} `} onClick={() => setPanelOpen(false)} />
					</div>
					<form className="flex flex-col gap-4 relative" onSubmit={e => submitHandler(e)}>
						<div className="h-16 bg-white w-1 absolute top-[10%] left-6 rounded-full" />
						<input
							type="text"
							placeholder="Add a pick-up location"
							value={pickup}
							onChange={handlePickup}
							onClick={() => {
								setActiveField('pickup');
								setPanelOpen(true);
							}}
							className="w-full rounded-lg bg-secondary pl-12 py-2 pr-4 text-base text-white placeholder:text-white/70 focus:outline-0 focus:ring-1 focus:ring-[var(--color-accent)]"
						/>

						<input
							type="text"
							placeholder="Enter your destination"
							value={destination}
							onChange={handleDestination}
							onClick={() => {
								setActiveField('destination');
								setPanelOpen(true);
							}}
							className="w-full rounded-lg  bg-secondary pl-12 py-2 pr-4 text-base text-white placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
						/>
						<div className="w-full flex items-center justify-between gap-3">
							<Select onValueChange={setLeaveNow} id="leave-timing" defaultValue="leave-now">
								<SelectTrigger
									className="w-full bg-purple-500 whitespace-nowrap flex items-center gap-2"
									animated={false}
								>
									<SelectValue placeholder="When to leave" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="leave-now">
										<span className="flex items-center gap-2">
											<Timer className="size-4" />
											Leave Now
										</span>
									</SelectItem>
									<SelectItem value="leave-later">
										<span className="flex items-center gap-2">
											<Calendar className="size-4" />
											Later
										</span>
									</SelectItem>
								</SelectContent>
							</Select>
							<button type='submit' className='w-full bg-purple-500 text-center text-white p-2 rounded-md'>Search</button>
						</div>
					</form>
				</div>
				<AnimatePresence>
					{panelOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: '70%', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="inset-0 z-40 h-[50%] pb-5 w-full bg-[var(--color-primary)]/80 backdrop-blur-lg shadow-lg overflow-y-auto"
						>
							<LocationSearchPanel
								setPanelOpen={setPanelOpen}
								setVehiclePanel={setVehiclePanel}
								suggestions={suggestions}
								loading={loading}
								onSuggestionSelect={handleSuggestionSelect}
								activeField={activeField}
							/>
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{vehiclePanel && (
						<motion.div
							initial={{ translateY: '100%', opacity: 0 }}
							animate={{ translateY: '0%', opacity: 1 }}
							exit={{ translateY: '100%', opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="fixed bottom-0 w-full bg-primary p-4 space-y-3 z-50"
						>
							<VehicalPanel setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} fare={fare} setVehicle={setVehicle} />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{confirmRide && (
						<motion.div
							initial={{ translateY: '100%', opacity: 0 }}
							animate={{ translateY: '0%', opacity: 1 }}
							exit={{ translateY: '100%', opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="fixed bottom-0 w-full bg-primary p-4 space-y-3 z-50"
						>
							<ConfirmRide setConfirmRide={setConfirmRide} setSearchDriver={setSearchDriver} setVehiclePanel={setVehiclePanel} vehicle={vehicle} pickup={pickup} destination={destination} setConfirm={setConfirm} />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{searchDriver && (
						<motion.div
							initial={{ translateY: '100%', opacity: 0 }}
							animate={{ translateY: '0%', opacity: 1 }}
							exit={{ translateY: '100%', opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="fixed bottom-0 w-full bg-primary p-4 space-y-3 z-50"
						>
							<LookForDriver setSearchDriver={setSearchDriver} setWaitingForDriver={setWaitingForDriver} confirm={confirm} />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{waitingForDriver && (
						<motion.div
							initial={{ translateY: '100%', opacity: 0 }}
							animate={{ translateY: '0%', opacity: 1 }}
							exit={{ translateY: '100%', opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="fixed bottom-0 w-full bg-primary p-4 space-y-3 z-50"
						>
							<WaitingDriver setWaitingForDriver={setWaitingForDriver} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div >


	)
}
