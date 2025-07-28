import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ClusteringContext } from '../../../../../contexts/clustering';

const AddStudent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<(string | number)[][]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const navigate = useNavigate();
  const context = useContext(ClusteringContext);

  if (!context) {
    throw new Error('AddStudent must be used within a ClusteringProvider');
  }

  const { uploadCSV, loading: contextLoading } = context;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setParsedData([]); // Clear previous preview
      setUploadStatus('idle');
      setUploadMessage('');

      // Optional: Implement client-side CSV parsing for preview
      // This is a simplified example, you might use a library like PapaParse
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const header = lines[0].split(',').map(h => h.trim()); // Assuming comma-separated
        const previewRows = lines.slice(1, 6).map(line => line.split(',').map(c => c.trim())); // Preview first 5 rows

        // Basic validation for preview: ensure enough columns
        if (header.length >= 4) { // Assuming at least Student ID, Name, Program, Cluster
            const formattedPreview = previewRows.map(row => {
                // Adjust indices based on your actual CSV structure for preview
                const studentId = row[0] || 'N/A';
                const name = row[1] || 'N/A';
                const programAndGrade = row[2] || 'N/A'; // This might need more complex parsing if it's 'BSCS-4'
                // For cluster, we don't have it yet from raw CSV, so leave empty or placeholder
                const assignedCluster = 'Pending';
                return [studentId, name, programAndGrade, assignedCluster];
            });
            setParsedData(formattedPreview);
        } else {
            setParsedData([['Invalid CSV format: Not enough columns for preview.']]);
        }
      };
      reader.readAsText(file);

    } else {
      setSelectedFile(null);
      setParsedData([]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a CSV file first.');
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    setUploadMessage('Uploading and processing CSV...');

    try {
      const response = await uploadCSV(selectedFile); // Use the context's uploadCSV function
      console.log('CSV Upload Response:', response);
      setUploadStatus('success');
      setUploadMessage(`CSV "${selectedFile.name}" uploaded and processing initiated successfully!`);
      setSelectedFile(null); // Clear selected file
      setParsedData([]); // Clear preview data
      // Optionally navigate or show a success message
    } catch (error: any) {
      console.error('CSV Upload Error:', error.response?.data || error.message);
      setUploadStatus('error');
      setUploadMessage(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleBack = () => {
    navigate("/admin/students/view");
  };

  const isLoading = uploadStatus === 'uploading' || contextLoading;

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
          onChange={handleFileChange}
          className="bg-[#F3F4F6] shadow-sm rounded p-2 cursor-pointer"
          disabled={isLoading}
        />
        {selectedFile && (
          <p className="text-sm text-gray-600 mt-2">Selected file: {selectedFile.name}</p>
        )}
        {uploadMessage && (
          <p className={`text-sm mt-2 ${uploadStatus === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {uploadMessage}
          </p>
        )}
        {/* <button className="w-fit px-4 py-2 bg-[#09984B] text-white rounded hover:bg-[#016630] transition cursor-pointer">
          Process CSV
        </button> */}
      </div>

      {/* Preview Table */}
      <div className="overflow-x-auto shadow rounded-lg mb-4">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-white text-[#4B5563] uppercase sticky top-0 z-10 shadow-md">
            <tr>
              {['Student ID', 'Name', 'Program & Grade', 'Assigned Cluster'].map((col, idx) => (
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
                  {selectedFile ? 'Parsing file...' : 'No data available. Select a CSV file to preview students.'}
                </td>
              </tr>
            ) : (
              parsedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition hover:bg-gray-50 text-[#4B5563] font-semibold ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F3F4F6]'
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
        <button
        onClick={handleUpload}
         className="px-4 py-2 bg-[#09984B] text-white rounded hover:bg-[#016630] transition cursor-pointer"
         disabled={!selectedFile || isLoading}>
          {isLoading ? 'Processing...' : 'Upload & Add Students'}
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
