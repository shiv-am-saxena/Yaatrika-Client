import React from 'react'
import { Meteors } from '../components/ui/Meteors'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import { BentoGrid, BentoGridItem } from "../components/ui/BentoGrid";
import photo from '../assets/yaatrika.png'
import {ShineBorder} from '../components/ui/ShineBorder'
import dawn from '../assets/dawn-of-innovation.png'
export default function Home() {
    return (
        <>
            <div className="relative h-screen w-full max-w-screen overflow-hidden bg-gradient-to-b from-purple-950 to-purple-700 p-4">
                {/* HERO Content Container */}
                <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 md:px-24 md:py-32">

                    {/* Animated Heading */}
                    <h1 className="relative z-10 mx-auto max-w-5xl text-center text-3xl font-extrabold tracking-tight text-slate-200 md:text-5xl lg:text-7xl leading-tight">
                        {"Your Journey, Your Safety - Anytime, Anywhere."
                            .split(" ")
                            .map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.08, // Slightly faster reveal
                                        ease: "easeInOut",
                                    }}
                                    className="mr-2 inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                    </h1>

                    {/* Animated Subtext */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-lg font-normal text-purple-100 md:text-xl"
                    >
                        With Yaatrika, experience safe, reliable, and women-driven rides. Empowering every journey with trust, comfort, and care.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1 }}
                        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-6"
                    >
                        {/* Primary Button */}
                        <button className="w-56 transform rounded-full bg-white px-8 py-3 font-semibold text-purple-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white dark:text-purple-900">
                            Book a Ride
                        </button>

                        {/* Secondary Button */}
                        <button className="w-56 transform rounded-full border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-purple-800 dark:border-purple-300 dark:hover:bg-purple-100">
                            Become a Driver
                        </button>
                    </motion.div>

                    {/* Showcase Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        className="relative z-10 mt-16 w-full max-w-5xl overflow-hidden rounded-3xl border-2 border-purple-300 bg-purple-100/20 shadow-xl backdrop-blur-sm dark:border-purple-700 dark:bg-purple-900/30"
                    >
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
                            <img
                                src={photo}
                                alt="Yaatrika"
                                className="h-full w-full object-fit"
                            />
                        </div>
                        <ShineBorder shineColor='#fff'/>
                    </motion.div>
                </div>

                {/* Background Meteor Effect */}
                <Meteors />
            </div>
            <div className='bg-purple-950 lg:p-20 p-4'>
                <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={item.className}
                            icon={item.icon}
                        />
                    ))}
                </BentoGrid>
            </div>
        </>
    )
}

const Skeleton = (src) => (
    <img className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-white/[0.2]" src={src}/>
);

const items = [
    {
        title: "The Dawn of Innovation",
        description: `Explore how Yaatrika is redefining women's safety in transportation. From a simple vision to a transformative platform - learn how we are building a secure and empowering ride-sharing ecosystem.`,
        header: <Skeleton src={dawn}/>,
        className: "md:col-span-2",
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the power of technology built for women. Discover how GPS tracking, real-time monitoring, and AI-driven safety systems work together to keep our riders and drivers safe.",
        header: <Skeleton />,
        className: "md:col-span-1",
    },
    {
        title: "The Art of Design",
        description: "See how thoughtful UI/UX enhances trust and usability. Yaatrika’s interface is crafted for simplicity and confidence - because safety begins with clarity.",
        header: <Skeleton />,
        className: "md:col-span-1",
    },
    {
        title: "The Power of Communication",
        description:"Understand how Yaatrika connects women to support when they need it most. From emergency contacts to real-time alerts, our platform ensures you’re never alone on the road.",
        header: <Skeleton />,
        className: "md:col-span-2",
    },
];