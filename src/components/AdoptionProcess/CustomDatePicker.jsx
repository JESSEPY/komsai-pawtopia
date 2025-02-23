import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({ value, onChange, disableFuture = false }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={onChange}
        disableFuture={disableFuture}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9FAFB", // Matches bg-formBg
                borderRadius: "8px", // Rounded corners
                border: "1px solid #9CA3AF", // Matches border-gray-400
                height: "43px", // Matches h-12
                "&:hover": {
                  border: "1px solid #9CA3AF",
                },
                "&.Mui-focused": {
                  borderColor: "#FF9300", // Ensures no black border
                  boxShadow: "0px 0px 4px rgba(255, 147, 0, 0.5)", // Soft glow effect
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Completely removes the double outline
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiInputLabel-root": {
                color: "#374151", // Label text color similar to text-gray-700
              },
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px", // Adjusts padding for consistency
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
