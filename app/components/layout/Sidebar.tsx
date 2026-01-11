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
  { label: "Staff", href: "/Staff", icon: "👨‍💼" },
];

export function Sidebar({
  open,
  setIsSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        m-2
        rounded-xl bg-gray-900 text-white
        transition-[width] duration-300
        ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? "w-64" : "w-16"}
      `}
    >
      <div
        className={`
          h-14 flex items-center
          ${open ? "justify-between px-4" : "justify-center"}
          transition-all duration-300
          border-b border-gray-700
        `}
      >
        {open && (
          <span className="font-bold tracking-wide">
          </span>
        )}

        <motion.button
          onClick={() => setIsSidebarOpen(!open)}
          animate={{
            rotate: open ? 180 : 0,
            x: open ? 0 : 6,
            scale: open ? 1 : 1.1,
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
            mass: 0.8,
          }}
          className="text-sm opacity-80 hover:opacity-100"
        >
          ▶
        </motion.button>

      </div>

      <nav className="mt-2 space-y-1">
        {MENU.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                mx-2 flex items-center rounded-lg
                transition-all duration-300
                ${open
                  ? "gap-3 px-3 py-2"
                  : "justify-center py-3"
                }
                ${isActive
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
                }
              `}
            >
              <span
                className={`
                  text-lg
                  transition-all duration-300
                  ${open
                    ? "translate-x-0 scale-100"
                    : "translate-x-1 scale-125"
                  }
                `}
              >
                {item.icon}
              </span>

              <span
                className={`
                  whitespace-nowrap
                  transition-all duration-300
                  ${open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }
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
