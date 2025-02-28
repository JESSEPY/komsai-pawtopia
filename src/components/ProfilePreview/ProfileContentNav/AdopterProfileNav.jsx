import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

let tabs = [
  { id: "overview", label: "Overview", path: "overview" },
  { id: "adopted", label: "Adopted", path: "adopted" },
  { id: "lost", label: "Lost", path: "lost" },
  { id: "comment", label: "Comment", path: "comment" },
  { id: "like", label: "Like", path: "like" },
];

function AnimatedTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Auto-navigate to "overview" if no valid tab is selected
  useEffect(() => {
    const isValidTab = tabs.some((tab) => location.pathname.endsWith(tab.path));

    if (!isValidTab) {
      navigate("overview", { replace: true });
    }
  }, [location.pathname, navigate]);

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
