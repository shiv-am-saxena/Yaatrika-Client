import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-800 py-12 px-6 md:px-20 text-gray-200 flex flex-col items-center">

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl w-full"
			>
				<h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Terms & Conditions</h1>

				<p className="text-sm md:text-base text-neutral-300 mb-10 text-center">
					Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
				</p>

				<div className="space-y-8">

					<section>
						<h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
						<p className="text-neutral-400 leading-relaxed">
							By accessing or using Yaatrika, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">2. Services Provided</h2>
						<p className="text-neutral-400 leading-relaxed">
							Yaatrika provides a safe and reliable platform exclusively for women passengers and drivers. We facilitate connections but are not a transportation provider ourselves.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">3. User Eligibility</h2>
						<p className="text-neutral-400 leading-relaxed">
							You must be at least 18 years old to register for a driver or rider account on Yaatrika. By using our services, you warrant that you meet these eligibility requirements.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">4. User Responsibilities</h2>
						<ul className="list-disc list-inside text-neutral-400 space-y-2 mt-2">
							<li>Provide accurate and complete information during registration</li>
							<li>Maintain the security of your account credentials</li>
							<li>Use the platform responsibly and lawfully</li>
							<li>Respect other users and comply with all community guidelines</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">5. Payment and Fees</h2>
						<p className="text-neutral-400 leading-relaxed">
							Payment for rides will be processed through our trusted payment partners. You agree to pay all charges incurred in connection with your account.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">6. Cancellation and Refund Policy</h2>
						<p className="text-neutral-400 leading-relaxed">
							Cancellation policies may vary based on ride status and timing. Refunds will be handled according to our posted refund policies at the time of booking.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
						<p className="text-neutral-400 leading-relaxed">
							Yaatrika is not responsible for any personal injury, property damage, or other damages resulting from your use of our platform. We provide the service "as is" without warranties of any kind.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">8. Termination</h2>
						<p className="text-neutral-400 leading-relaxed">
							We reserve the right to suspend or terminate your access to the platform at our discretion, without notice, for violations of these Terms or any applicable law.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">9. Changes to Terms</h2>
						<p className="text-neutral-400 leading-relaxed">
							We may modify these Terms at any time. Updated versions will be posted on our platform and are effective immediately upon posting.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
						<p className="text-neutral-400 leading-relaxed">
							These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
						<p className="text-neutral-400 leading-relaxed">
							If you have any questions about these Terms, please contact us at: <br />
							<a href="mailto:support@yaatrika.com" className="text-purple-300 underline">support@yaatrika.com</a>
						</p>
					</section>

				</div>

				<div className="mt-12 flex justify-center">
					<Link to="/" className="text-purple-300 hover:underline text-lg">
						← Back to Home
					</Link>
				</div>

			</motion.div>
		</div>
	);
};

export default TermsAndConditions;
