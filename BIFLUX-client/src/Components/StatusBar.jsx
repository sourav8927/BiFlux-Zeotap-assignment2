import React from 'react';

const StatusBar = ({ status }) => {
  if (!status) return null;

  const getColor = () => {
    if (status.toLowerCase().includes("error")) return "text-red-600";
    if (status.toLowerCase().includes("success")) return "text-green-600";
    return "text-blue-600";
  };

  return (
    <div className={`mt-6 text-center font-medium ${getColor()}`}>
       <span className="italic">{status}</span>
    </div>
  );
};

export default StatusBar;
