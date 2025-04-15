import React from 'react';

const PreviewTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No preview data available.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-center py-2 text-blue-700 border-b">Preview (First 100 Rows)</h3>
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-blue-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              {headers.map((header) => (
                <td key={header} className="px-4 py-1">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewTable;
