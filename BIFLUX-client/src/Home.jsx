import React, { useState } from 'react';
import SourceSelector from './Components/SourceSelector';
import ClickHouseForm from './Components/ClickHouseForm';
import FlatFileForm from './Components/FlatFileForm';
import TableColumnSelector from './Components/TableColumnSelector';

const Home = () => {
  const [selectedSource, setSelectedSource] = useState("clickhouse"); // default source

  const [columns, setColumns] = useState([]); // list of available columns
  const [selectedColumns, setSelectedColumns] = useState([]); // user selected columns

  const handleSourceChange = (e) => {
    setSelectedSource(e.target.value);
    setColumns([]); // reset columns on source change
    setSelectedColumns([]); // reset selected columns
  };

  const handleToggleColumn = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
        Data Ingestion Tool
      </h1>

      {/* Step 1: Select Source */}
      <SourceSelector
        selectedSource={selectedSource}
        onChangeSource={handleSourceChange}
      />

      {/* Step 2: Show form based on selected source */}
      {selectedSource === "clickhouse" ? (
        <ClickHouseForm setColumns={setColumns} />
      ) : (
        <FlatFileForm setColumns={setColumns} />
      )}

      {/* Step 3: Column Selector (when columns are available) */}
      {columns.length > 0 && (
        <TableColumnSelector
          columns={columns}
          selectedColumns={selectedColumns}
          onToggleColumn={handleToggleColumn}
        />
      )}
    </div>
  );
};

export default Home;
