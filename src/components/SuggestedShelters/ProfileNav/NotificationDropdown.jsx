import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BellAlertIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  HeartIcon, // ❤️ New "Like" Notification Icon
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import NotificationsLogo from "../../../assets/icons/sidebar/notificationAlt.svg";
import NotificationsHover from "../../../assets/icons/sidebar/notificationHover.svg";

const NotificationDropdown = ({ notifications, userId }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // ✅ Count unread notifications
  const unreadCount = notifications?.filter((notif) => !notif.read).length || 0;

  // ✅ Function to mark notification as read (Live update)
  const markAsRead = async (notifId) => {
    if (!userId) {
      console.error("User ID is undefined, cannot mark notification as read.");
      return;
    }

    const notifRef = doc(db, `users/${userId}/notifications/${notifId}`);
    try {
      await updateDoc(notifRef, { read: true });
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  return (
    <Menu as="div" className="relative">
      {/* Notification Button with Badge */}
      <Menu.Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex mt-1 items-center focus:outline-none"
      >
        <img
          src={isHovered ? NotificationsHover : NotificationsLogo}
          alt="Notifications"
          className="w-8 h-8 transition-transform transform scale-100 hover:scale-105 duration-500 ease-in-out"
        />

        {/* ✅ Small Badge if Unread Notifications Exist */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Menu.Button>

      {/* Notification Dropdown */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg focus:outline-none">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-100 rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Notifications</p>
            {unreadCount > 0 && (
              <span className="text-sm text-red-500 font-medium">
                {unreadCount} new
              </span>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-60 overflow-y-auto">
            {notifications && notifications.length > 0 ? (
              notifications
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((notification) => (
                  <Menu.Item key={notification.id}>
                    {({ active }) => (
                      <div
                        className={`flex gap-3 items-start px-4 py-3 text-sm cursor-pointer ${
                          active ? "bg-gray-100" : "bg-white"
                        } ${!notification.read ? "font-bold" : "font-normal"}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        {/* ✅ Dynamic Notification Icon based on Type */}
                        {notification.type === "request" ? (
                          <BellAlertIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                        ) : notification.type === "approved" ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                        ) : notification.type === "declined" ? (
                          <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                        ) : notification.type === "reviewing" ? (
                          <ClockIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
                        ) : notification.type === "like" ? ( // ✅ New "Like" Notification Icon
                          <HeartIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                        ) : (
                          <BellAlertIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                        )}

                        {/* Notification Content */}
                        <div>
                          <p className="text-gray-700">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No notifications
              </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationDropdown;
