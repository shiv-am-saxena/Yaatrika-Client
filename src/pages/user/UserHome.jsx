/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Input } from '../../components/ui/InputBx';
import { motion } from 'motion/react';
import { ArrowBigDown, Calendar, ChevronDown, Timer } from 'lucide-react';
import LocationSearchPanel from '../../components/LocationSearchPAnel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
export default function UserHome() {
	const [pickup, setPickup] = useState('');
	const [destination, setDestination] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
	}
	const [panelOpen, setPanelOpen] = useState(false)
	const [leaveNow, setLeaveNow] = useState('')
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
						<div className="h-16 bg-white w-1 absolute top-[19%] left-6 rounded-full" />
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
						/>
						<Select onValueChange={setLeaveNow} id="leave-timing">
							<SelectTrigger className={`w-full bg-purple-500 whitespace-nowrap`} animated={false}>
								<SelectValue placeholder={"When to leave"} className="whitespace-nowrap" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="leave-now"><Timer />Leave Now</SelectItem>
								<SelectItem value="leave-later"><Calendar />Later</SelectItem>
							</SelectContent>
						</Select>
					</form>
				</div>
				<motion.div
					className="relative h-0 w-full bg-[var(--color-primary)]/80 backdrop-blur-lg shadow-lg"
					animate={panelOpen ? { height: '100%', opacity: 1, display: 'block' } : { height: '0%', opacity: 0, display: 'none' }}
				>
					<LocationSearchPanel />
				</motion.div>
			</div>
		</div>


	)
}
