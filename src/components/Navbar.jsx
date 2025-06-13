import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../lib/toast";
import axiosInstance from "../config/axiosInstance";
import { clearAuth, setLoading } from "../context/slices/authSlice";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const authLink = [
        { name: "Sign In", slug: "/auth/login" },
        { name: "Sign Up", slug: "/auth/user/register" },
    ];
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            dispatch(setLoading(true));
            const response = await axiosInstance.get('/auth/user/logout', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.data;
            console.log(res)
            if (res.success) {
                localStorage.removeItem('token');
                showSuccessToast(res.message);
                dispatch(clearAuth());
            }
        } catch (error) {
            showErrorToast(error.response.message);
            dispatch(setLoading(false));
        }finally{
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md shadow-lg bg-purple-950/80 border-b border-purple-800" : "bg-purple-950"}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
                {/* Logo */}
                <h1 className="text-2xl lg:text-3xl font-bold uppercase text-white tracking-widest font-montserrat">
                    <Link to="/">Yaatrika</Link>
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            `text-lg font-semibold tracking-wide ${isActive
                                ? "text-white underline underline-offset-4"
                                : "text-purple-200 hover:text-white"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    {authLink.map(({ name, slug }, index) => (
                        <NavLink
                            key={index}
                            to={slug}
                            className={({ isActive }) =>
                                `text-lg font-semibold tracking-wide ${isActive
                                    ? "text-white underline underline-offset-4"
                                    : "text-purple-200 hover:text-white"
                                } ${isAuthenticated
                                    ? "hidden"
                                    : "block"
                                }`
                            }
                        >
                            {name}
                        </NavLink>
                    ))}
                    {isAuthenticated && <>
                        <NavLink
                            to='/profile'
                            className={({ isActive }) =>
                                `text-lg font-semibold tracking-wide ${isActive
                                    ? "text-white underline underline-offset-4"
                                    : "text-purple-200 hover:text-white"
                                }`
                            }
                        >
                            Welcome, {user?.firstName}
                        </NavLink>
                        <NavLink
                            onClick={handleLogout}
                            className={({ isActive }) =>
                                `text-lg font-semibold tracking-wide ${isActive
                                    ? "text-white underline underline-offset-4"
                                    : "text-purple-200 hover:text-white"
                                }`
                            }
                        >
                            Logout
                        </NavLink></>
                    }
                </div>

                {/* Hamburger Icon */}
                <motion.div
                    onClick={handleMenuToggle}
                    className="cursor-pointer md:hidden"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "32px", height: "32px" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-8 h-8 text-white"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </motion.div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="sticky top-16 z-40 w-full rounded-b-2xl bg-purple-800/80 py-6 backdrop-blur-md shadow-lg md:hidden"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            {authLink.map(({ name, slug }, index) => (
                                <NavLink
                                    to={slug}
                                    key={index}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `text-lg font-semibold tracking-wide ${isActive
                                            ? "text-white underline underline-offset-4"
                                            : "text-purple-100 hover:text-purple-300"
                                        }`
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
