import React, { useState } from 'react';
import SourceSelector from './Components/SourceSelector';
import ClickHouseForm from './Components/ClickHouseForm';
import FlatFileForm from './Components/FlatFileForm';
import TableColumnSelector from './Components/TableColumnSelector';
import PreviewTable from './Components/PreviewTable';
import IngestionControls from './Components/IngestionControls';
import StatusBar from './Components/StatusBar';
import ResultDisplay from './Components/ResultDisplay';

const Home = () => {
  const [selectedSource, setSelectedSource] = useState("clickhouse");

  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const [previewData, setPreviewData] = useState([]);
  const [status, setStatus] = useState("");
  const [recordCount, setRecordCount] = useState(null);

  const handleSourceChange = (e) => {
    setSelectedSource(e.target.value);
    setColumns([]);
    setSelectedColumns([]);
    setPreviewData([]);
    setStatus("");
    setRecordCount(null);
  };

  const handleToggleColumn = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handlePreview = () => {
    // Simulate previewing 5 records
    const sample = Array.from({ length: 5 }, (_, idx) =>
      selectedColumns.reduce((obj, col) => {
        obj[col] = `Sample ${col} ${idx + 1}`;
        return obj;
      }, {})
    );
    setPreviewData(sample);
  };

  const handleIngest = async () => {
    setStatus("Ingesting...");
    setRecordCount(null);
    try {
      // Simulate API ingestion delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const simulatedCount = 1240; // Simulate count result
      setStatus("Ingestion successful.");
      setRecordCount(simulatedCount);
    } catch (error) {
      setStatus("Error during ingestion.");
    }
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

      {/* Step 2: Show form based on source */}
      {selectedSource === "clickhouse" ? (
        <ClickHouseForm setColumns={setColumns} />
      ) : (
        <FlatFileForm setColumns={setColumns} />
      )}

      {/* Step 3: Column Selector */}
      {columns.length > 0 && (
        <TableColumnSelector
          columns={columns}
          selectedColumns={selectedColumns}
          onToggleColumn={handleToggleColumn}
        />
      )}

      {/* Step 4: Preview Table */}
      {selectedColumns.length > 0 && (
        <PreviewTable
          data={previewData}
          onPreview={handlePreview}
          hasPreview={previewData.length > 0}
        />
      )}

      {/* Step 5: Ingestion Controls */}
      {selectedColumns.length > 0 && (
        <IngestionControls
          onIngest={handleIngest}
          status={status}
          recordCount={recordCount}
        />
      )}
      <StatusBar status={status} />
      <ResultDisplay recordCount={recordCount} />
    </div>
  );
};

export default Home;
