import React, { useState, useContext } from "react";
import * as Components from "../../../../components";
import { ClusteringContext, type Cluster, type Advisor } from "../../../../../contexts/clustering";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ViewCluster: React.FC = () => {
  const { clusters, advisors, loading } = useContext(ClusteringContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const navigate = useNavigate();

  const getAdvisorName = (advisorId: number | null): string => {
    if (advisorId === null) return "No Advisor";
    const advisor = advisors.find((adv: Advisor) => adv.id === advisorId);
    return advisor ? advisor.name : "Unknown Advisor";
  };

  const tableData = clusters.map((c: Cluster) => [
    String(c.id),
    c.name,
    getAdvisorName(c.advisor),
    String(c.student_count ?? 0),
  ]);

  const filtered = tableData
    .filter(([id, name, advName]) =>
      [id, name, advName]
        .map(String)
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortValue) {
        case "name-asc": return String(a[1]).localeCompare(String(b[1]));
        case "name-desc": return String(b[1]).localeCompare(String(a[1]));
        case "id-asc": return String(a[0]).localeCompare(String(b[0]));
        case "id-desc": return String(b[0]).localeCompare(String(a[0]));
        default: return 0;
      }
    });

// ViewCluster.tsx — AFTER
const handleEdit = (rowIndex: number) => {
  // filtered[rowIndex][0] is the visible "ID" column value
  const idStr = filtered[rowIndex]?.[0] as string | undefined;
  if (idStr) navigate(`/admin/clusters/edit/${idStr}`);
};


  // ✅ Export to Excel
  const handleExportExcel = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/clustering/export-clusters-excel/",
        { responseType: "blob" } // important to download file
      );

      const blob = response.data as Blob; // ✅ Cast response to Blob
    const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "clusters_export.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export Excel. Check console for details.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">CLUSTER MANAGEMENT</h2>
        <button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>


        <Components.CRUDHeader
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          sortValue={sortValue}
          onSortChange={setSortValue}
          placeholder="Search by ID, name, or advisor..."
        />



      {loading ? (
        <div className="text-gray-500">Loading clusters…</div>
      ) : (
        <Components.CRUDTable
          columns={["ID", "Name", "Advisor", "Student Count", "Actions"]}
          data={filtered}
          itemLabel="cluster"
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default ViewCluster;
