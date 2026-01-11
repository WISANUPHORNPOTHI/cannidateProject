"use client";

import { motion } from "framer-motion";

type NavbarProps = {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
};

export function Navbar({
    sidebarOpen,
    onToggleSidebar,
}: NavbarProps) {
    return (
        <motion.header
            animate={{
                marginLeft: sidebarOpen ?  10  : 10,
            }}
            transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
            }}
            className="
        m-2 h-14
        flex items-center justify-between
        rounded-xl
        bg-gray-800 text-gray-100
        px-4
        shadow-lg
        border border-gray-700/50
      "
        >
            {/* LEFT */}
            <div className="flex items-center gap-3">
                <motion.button
                    onClick={onToggleSidebar}
                    animate={{ rotate: sidebarOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="text-gray-300 hover:text-white"
                >
                    ☰
                </motion.button>

                <span className="font-semibold tracking-wide">
                    Dashboard
                </span>
            </div>

            <div className="flex items-center gap-3">
                <motion.span
                    animate={{
                        opacity: sidebarOpen ? 1 : 0,
                        x: sidebarOpen ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-gray-300"
                >
                    Hello
                </motion.span>

                <button
                    className="
            rounded-lg
            bg-red-500/90
            px-3 py-1 text-sm
            text-white
            hover:bg-red-500
            transition
          "
                >
                    Logout
                </button>
            </div>
        </motion.header>
    );
}
