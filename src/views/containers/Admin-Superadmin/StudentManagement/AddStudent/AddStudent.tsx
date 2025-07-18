import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddStudent = () => {
  const [parsedData, setParsedData] = useState<(string | number)[][]>([]);
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Placeholder for CSV parsing logic
    setParsedData([]); // Ensures re-render
  };

  const handleBack = () => {
    navigate("/admin/students/view");
  };

  return (
    <div className="p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-[#09984B] hover:underline cursor-pointer"
      >
        <FaArrowLeft className="mr-2" /> Back to Students View
      </button>

      <h2 className="text-2xl font-bold mb-4">ADD STUDENT</h2>

      {/* Upload Section */}
      <div className="bg-white rounded-lg flex flex-col gap-3 p-4 mb-6 shadow">
        <label className="font-medium text-[#4B5563]">Select CSV File</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="bg-[#F3F4F6] shadow-sm rounded p-2"
        />
        <button className="w-fit px-4 py-2 bg-[#09984B] text-white rounded hover:bg-[#016630] transition cursor-pointer">
          Process CSV
        </button>
      </div>

      {/* Preview Table */}
      <div className="overflow-x-auto shadow rounded-lg mb-4">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-white text-[#4B5563] uppercase sticky top-0 z-10 shadow-md">
            <tr>
              {["ID", "Name", "Email", "Assigned Cluster"].map((col, idx) => (
                <th key={idx} className="px-4 py-3.5">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 py-6 bg-white"
                >
                  No data available. Upload a CSV file to preview students.
                </td>
              </tr>
            ) : (
              parsedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition hover:bg-gray-50 text-[#4B5563] font-semibold ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#F3F4F6]"
                  }`}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-4.5">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Final Action Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[#09984B] text-white rounded hover:bg-[#016630] transition cursor-pointer">
          Add Students
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
