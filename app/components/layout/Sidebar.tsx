"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

type SidebarProps = {
  open: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const MENU = [
  { label: "Patient", href: "/main/Patient", icon: "🧑‍⚕️" },
  { label: "Staff", href: "/main/Staff", icon: "👨‍💼" },
];

export function Sidebar({ open, setIsSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="
        m-2
        w-16
        md:w-auto
        md:transition-[width] md:duration-300
        md:ease-[cubic-bezier(0.4,0,0.2,1)]
        md:[&]:w-64
        md:[&]:w-16
        rounded-xl
        bg-gray-900
        text-white
      "
      style={{
        width: typeof window !== "undefined" && window.innerWidth >= 768
          ? open ? 256 : 64
          : 64,
      }}
    >
      {/* Header */}
      <div
        className="
          h-14
          flex items-center justify-center
          border-b border-gray-700
        "
      >
        {/* Toggle: desktop only */}
        <motion.button
          onClick={() => setIsSidebarOpen(!open)}
          className="
            hidden md:block
            text-sm opacity-80 hover:opacity-100
          "
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          ▶
        </motion.button>
      </div>

      {/* Menu */}
      <nav className="mt-2 space-y-2">
        {MENU.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                mx-2
                flex items-center justify-center
                rounded-xl
                py-3
                transition-colors
                ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}
              `}
            >
              {/* Icon */}
              <span className="text-2xl">
                {item.icon}
              </span>

              {/* Label: desktop only */}
              <span
                className={`
                  hidden md:inline-block
                  ml-3 whitespace-nowrap
                  transition-all duration-300
                  ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
