import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-800 py-12 px-6 md:px-20 text-gray-200 flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full"
            >

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>

                <p className="text-sm md:text-base text-neutral-300 mb-10 text-center">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="space-y-8">

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            Welcome to Yaatrika. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit or use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            We may collect the following types of information:
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2">
                            <li>Personal Information (name, email address, phone number, location, etc.)</li>
                            <li>Ride details and preferences</li>
                            <li>Payment information (securely processed)</li>
                            <li>Device and usage data (IP address, browser type, device ID)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We use your information to:
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2 mt-2">
                            <li>Provide safe and reliable rides</li>
                            <li>Facilitate bookings and payments</li>
                            <li>Communicate updates, offers, or service changes</li>
                            <li>Enhance user experience and app performance</li>
                            <li>Ensure the safety and security of all users</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">4. Sharing of Information</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We only share your data:
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2 mt-2">
                            <li>With drivers or passengers involved in your booking</li>
                            <li>With trusted service providers who support our operations</li>
                            <li>When required by law enforcement or legal obligations</li>
                            <li>To prevent fraudulent, abusive, or unlawful use of our platform</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">5. Security of Your Information</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We implement industry-standard security measures, including encryption, secure servers, and access controls to protect your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">6. Your Privacy Rights</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            Depending on your location, you may have rights regarding your personal data, such as accessing, updating, or deleting your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We may update this Privacy Policy periodically. We encourage you to review it regularly. Your continued use of Yaatrika constitutes your acceptance of any changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            If you have any questions about this Privacy Policy or our practices, please contact us at:
                            <br />
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

export default PrivacyPolicy;
