import React, { useState } from "react";


const FlatFileForm = () => {
  const [file, setFile] = useState(null);
  const [delimiter, setDelimiter] = useState(",");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a CSV file.");
      return;
    }

    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("delimiter", delimiter);

    // try {
    //   const res = await axios.post("/api/upload-csv", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   if (res.data.success) {
    //     setStatus("✅ File uploaded and parsed successfully!");
    //   } else {
    //     setStatus("❌ Upload failed.");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setStatus("❌ Error uploading file.");
    // }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Upload Flat File (CSV)
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="input"
        />

        <input
          type="text"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
          placeholder="Delimiter (default: ,)"
          className="input"
        />

        <button
          onClick={handleUpload}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
        >
          Upload
        </button>

        {status && (
          <div className="text-sm text-center text-gray-700 mt-2">{status}</div>
        )}
      </div>
    </div>
  );
};

export default FlatFileForm;
