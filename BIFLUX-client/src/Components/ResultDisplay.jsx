import React from 'react';

const ResultDisplay = ({ recordCount }) => {
  if (recordCount === null) return null;

  return (
    <div className="mt-4 text-center text-lg font-semibold text-green-700">
      <span>{recordCount}</span> records successfully ingested!
    </div>
  );
};

export default ResultDisplay;
