import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

let tabs = [
  { id: "overview", label: "Overview", path: "overview" },
  { id: "pet-food", label: "Pet Food", path: "pet-food" },
  { id: "accessories", label: "Accessories", path: "accessories" },
  { id: "toys", label: "Toys", path: "toys" },
  { id: "clothes", label: "Clothes", path: "clothes" },
];

function AnimatedTabs() {
  return (
    <div className="flex space-x-16">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `relative rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "text-black font-bold"
                : "text-black hover:text-gray-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-orange-100"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {/* Text Label (keeps it above the pill) */}
              <span className="relative z-20">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default AnimatedTabs;
