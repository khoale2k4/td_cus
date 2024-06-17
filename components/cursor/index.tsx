import { motion } from "framer-motion";

const cursorVariants = {
    blinking: {
        opacity: [0, 0, 1, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "linear",
            times: [0, 0.5, 0.5, 1]
        }
    }
};

export default function CursorBlinker(prop: { size: string }) {
    return (
        <motion.div
            variants={cursorVariants}
            animate="blinking"
            className={`inline-block w-[3px] mb-3 bg-white h-${prop.size}`}
        />
    );
}