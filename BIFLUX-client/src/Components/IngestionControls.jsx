import React from 'react';

const IngestionControls = ({ onIngest, status, recordCount }) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <button
        onClick={onIngest}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold shadow"
      >
        🚀 Start Ingestion
      </button>

      {status && (
        <div className="text-sm text-gray-700">
          <span className="font-medium">Status:</span> {status}
        </div>
      )}

      {recordCount !== null && (
        <div className="text-lg font-bold text-green-700">
          ✅ {recordCount} records successfully ingested!
        </div>
      )}
    </div>
  );
};

export default IngestionControls;
