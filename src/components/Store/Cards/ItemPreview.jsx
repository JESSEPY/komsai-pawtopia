import React from "react";
import { motion } from "framer-motion";
import dummyProfile from "../../../assets/store/sample_profile.png";

function ItemPreview({ item, onClose }) {
  return (
    <motion.div
      className="w-full max-w-[600px] mx-auto min-h-[40vh] bg-white shadow-lg rounded-lg p-6 relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      layout
    >
      <button
        className="absolute top-2 right-2 bg-gray-100 text-black px-3 py-1 rounded-full"
        onClick={onClose}
      >
        X
      </button>
      <img
        src={item.photo}
        alt={item.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mt-4">
        {item.name} - ₱{item.price}
      </h2>
      <p className="text-gray-700 mt-2">{item.description}</p>

      <div className="flex mt-20">
        <img
          src={dummyProfile}
          alt="Profile Picture"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="ml-4">
          <p className="text-gray-700 mt-2">MARO</p>
          <p className="text-gray-700 mt-2">Trusted by pawtopia</p>
        </div>
      </div>

      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <p className="text-[#1060FF] mt-20">Product Link</p>
      </a>
    </motion.div>
  );
}

export default ItemPreview;
