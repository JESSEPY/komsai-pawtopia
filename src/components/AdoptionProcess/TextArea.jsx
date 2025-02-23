import React from "react";

const TextArea = ({ label, value, onChange, required = false, rows = 8 }) => {
  return (
    <div className="mt-6 md:col-span-10">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="mt-3 w-full border bg-formBg border-gray-400 rounded-xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
      />
    </div>
  );
};

export default TextArea;
