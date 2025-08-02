import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ClusteringContext } from '../../../../../contexts/clustering';
import * as Components from "../../../../components"; // ✅ Using CRUDHeader and CRUDTable

const AddStudent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<(string | number)[][]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");

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
      setParsedData([]);
      setUploadStatus('idle');
      setUploadMessage('');

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');

        // ✅ Skip first 4 rows
        const filteredLines = lines.slice(4);

        // ✅ Extract only 3rd, 4th, and 5th columns, add "Pending" as 4th column for Assigned Cluster
        const processedData = filteredLines.map(line => {
          const cols = line.split(',').map(c => c.trim());
          if (cols.length >= 5) {
            const studentId = cols[2] || 'N/A';
            const name = cols[3] || 'N/A';
            const programAndGrade = cols[4] || 'N/A';
            const assignedCluster = 'Pending';
            return [studentId, name, programAndGrade, assignedCluster];
          }
          return [];
        }).filter(row => row.length > 0);

        // ✅ Limit preview to 50 rows
        const preview = processedData.slice(0, 50);
        setParsedData(preview);
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
      const response = await uploadCSV(selectedFile);
      console.log('CSV Upload Response:', response);
      setUploadStatus('success');
      setUploadMessage(`CSV "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);
      setParsedData([]);
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

  // ✅ Keep your original headers
  const tableHeaders = ['Student ID', 'Name', 'Program & Grade', 'Assigned Cluster'];

  // ✅ Apply search & sort to preview
  const filteredData = parsedData.filter(row =>
    row.some(cell => String(cell).toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    switch (sortValue) {
      case "name-asc":
        return String(a[1]).localeCompare(String(b[1]));
      case "name-desc":
        return String(b[1]).localeCompare(String(a[1]));
      case "id-asc":
        return String(a[0]).localeCompare(String(b[0]));
      case "id-desc":
        return String(b[0]).localeCompare(String(a[0]));
      default:
        return 0;
    }
  });

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
      </div>

      {/* CRUDHeader for Search & Sort */}
      <Components.CRUDHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        sortValue={sortValue}
        onSortChange={setSortValue}
        placeholder="Search by student info..."
      />

      {/* Preview Table */}
      <div className="mb-4">
        {filteredData.length > 0 ? (
          <Components.CRUDTable
            columns={tableHeaders}
            data={filteredData}
            itemsPerPage={5}
            itemLabel="rows"
          />
        ) : (
          <div className="text-center text-gray-500 py-6 bg-white shadow rounded-lg">
            {selectedFile
              ? "No previewable rows after skipping first 4 rows and extracting columns 3–5."
              : "No data available. Select a CSV to preview students."}
          </div>
        )}
      </div>

      {/* Final Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-[#09984B] text-white rounded hover:bg-[#016630] transition cursor-pointer"
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? 'Processing...' : 'Upload & Add Students'}
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
