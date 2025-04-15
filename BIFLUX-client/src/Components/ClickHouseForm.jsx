import React, { useState } from "react";


const ClickHouseForm = () => {
  const [formData, setFormData] = useState({
    host: "",
    port: "",
    database: "",
    username: "",
    jwt: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConnect = async () => {
    setStatus("Connecting...");

    // try {
    //   const response = await axios.post("/api/connect-clickhouse", formData);
    //   if (response.data.success) {
    //     setStatus("✅ Connected to ClickHouse!");
    //   } else {
    //     setStatus("❌ Failed to connect.");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setStatus("❌ Error: Could not connect.");
    // }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        ClickHouse Connection
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="host"
          value={formData.host}
          onChange={handleChange}
          placeholder="Host (e.g., http://localhost)"
          className="input"
        />
        <input
          type="text"
          name="port"
          value={formData.port}
          onChange={handleChange}
          placeholder="Port (8123 / 8443 / 9000)"
          className="input"
        />
        <input
          type="text"
          name="database"
          value={formData.database}
          onChange={handleChange}
          placeholder="Database Name"
          className="input"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="input"
        />
        <input
          type="text"
          name="jwt"
          value={formData.jwt}
          onChange={handleChange}
          placeholder="JWT Token"
          className="input"
        />

        <button
          onClick={handleConnect}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Connect
        </button>

        {status && (
          <div className="text-sm text-center text-gray-700 mt-2">{status}</div>
        )}
      </div>
    </div>
  );
};

export default ClickHouseForm;
