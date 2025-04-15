import React from "react";

const TableColumnSelector = ({ columns, selectedColumns, onToggleColumn }) => {
  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Select Columns to Ingest
      </h2>

      {columns.length === 0 ? (
        <p className="text-center text-gray-500">No columns available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {columns.map((col) => (
            <label key={col} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColumns.includes(col)}
                onChange={() => onToggleColumn(col)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">{col}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableColumnSelector;
