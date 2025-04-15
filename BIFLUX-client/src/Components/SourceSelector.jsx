import React from 'react'

const SourceSelector = ({ selectedSource, onChangeSource }) => {
  return (
    <div className="p-4 bg-white shadow rounded-xl w-full max-w-md mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Select Data Source</h2>
      <div className="flex justify-around">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="source"
            value="clickhouse"
            checked={selectedSource === "clickhouse"}
            onChange={onChangeSource}
            className="accent-blue-600"
          />
          <span className="text-gray-700">ClickHouse</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="source"
            value="flatfile"
            checked={selectedSource === "flatfile"}
            onChange={onChangeSource}
            className="accent-green-600"
          />
          <span className="text-gray-700">Flat File (CSV)</span>
        </label>
      </div>
    </div>
  )
}

export default SourceSelector;