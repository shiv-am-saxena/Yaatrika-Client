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
export default function UserHome() {
	const [pickup, setPickup] = useState('');
	const [destination, setDestination] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
	}
	const [panelOpen, setPanelOpen] = useState(false)
	const [leaveNow, setLeaveNow] = useState('')
	const [vehiclePanel, setVehiclePanel] = useState(false);
	const [confirmRide, setConfirmRide] = useState(false);
	const [searchDriver, setSearchDriver] = useState(false);
	const [waitingForDriver, setWaitingForDriver] = useState(false);
	return (
		<div className="relative h-[calc(100vh-64px)] w-full font-montserrat">
			{/* Background GIF */}
			<div className="h-full max-h-screen w-full bg-[var(--color-bg)]">
				<img
					src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
					alt="City ride background"
					className="h-full w-full object-cover"
				/>
			</div>

			{/* Foreground Form Container */}
			<div className="absolute bottom-0 h-[calc(100vh-64px)] left-0 w-full flex flex-col justify-end">
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
							onChange={e => setPickup(e.target.value)}
							onClick={() => { setPanelOpen(true) }}
							className="w-full rounded-lg bg-secondary pl-12 py-2 pr-4 text-base text-white placeholder:text-white/70 focus:outline-0 focus:ring-1 focus:ring-[var(--color-accent)]"
						/>

						<input
							type="text"
							placeholder="Enter your destination"
							value={destination}
							onChange={e => setDestination(e.target.value)}
							onClick={() => { setPanelOpen(true) }}
							className="w-full rounded-lg  bg-secondary pl-12 py-2 pr-4 text-base text-white placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
						/><Select onValueChange={setLeaveNow} id="leave-timing" defaultValue="leave-now">
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
							<VehicalPanel setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} />
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
							<ConfirmRide setConfirmRide={setConfirmRide} setSearchDriver={setSearchDriver} setVehiclePanel={setVehiclePanel} />
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
							<LookForDriver setSearchDriver={setSearchDriver} setWaitingForDriver={setWaitingForDriver} />
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
