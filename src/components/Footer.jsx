import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    if (location.pathname.startsWith("/user") || location.pathname.startsWith("/captain")) return null;
    return (
        <div className="border-t border-white/[0.1] px-8 py-20 bg-purple-950 w-full relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start md:px-8">
                {/* Logo and Copyright Section */}
                <div>
                    <div className="mr-0 md:mr-4 md:flex mb-4">
                        <Link className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20" to="/">
                            <span className="text-2xl lg:text-3xl font-bold uppercase text-white tracking-widest font-[montserrat]">Yaatrika</span>
                        </Link>
                    </div>
                    <div className="mt-2 ml-2 text-neutral-300">© copyright Yaatrika {new Date().getFullYear()}. All rights reserved.</div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 items-start mt-10 sm:mt-0 md:mt-0">
                    {/* Pages Section */}
                    <div className="flex justify-center space-y-4 flex-col w-full">
                        <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">Pages</p>
                        <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Home</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Features</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Pricing</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Contact</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Socials Section */}
                    <div className="flex justify-center space-y-4 flex-col">
                        <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">Socials</p>
                        <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Facebook</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Instagram</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Twitter</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">LinkedIn</Link></li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="flex justify-center space-y-4 flex-col">
                        <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">Legal</p>
                        <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="/terms-and-conditions">Terms of Service</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Register Section */}
                    <div className="flex justify-center space-y-4 flex-col">
                        <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">Register</p>
                        <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Sign Up</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Login</Link></li>
                            <li><Link className="transition-colors hover:text-text-neutral-800" to="#">Book a demo</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Large Gradient Text Section */}
            <p className="text-center uppercase mt-20 text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-950 inset-x-0">
                Yaatrika
            </p>
        </div>
    );
};

export default Footer;
