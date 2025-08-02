// src/views/containers/Admin-Superadmin/ClusterManagement/ViewCluster/ViewCluster.tsx
import React, { useState, useContext } from "react";
import * as Components from "../../../../components";
import { ClusteringContext, type Cluster, type Advisor } from "../../../../../contexts/clustering";
import { useNavigate } from 'react-router-dom';

const ViewCluster: React.FC = () => {
  const { clusters, advisors, loading } = useContext(ClusteringContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const navigate = useNavigate();

  // Helper: Get advisor name by ID
  const getAdvisorName = (advisorId: number | null): string => {
    if (advisorId === null) return "No Advisor";
    const advisor = advisors.find((adv: Advisor) => adv.id === advisorId);
    return advisor ? advisor.name : "Unknown Advisor";
  };

  // ✅ Build table data including student count
  const tableData = clusters.map((c: Cluster) => [
    String(c.id),                          // Cluster ID
    c.name,                                // Cluster name
    getAdvisorName(c.advisor),             // Advisor name
    String(c.student_count ?? 0),          // Student count (fallback 0 if missing)
  ]);

  // ✅ Filter + Sort
  const filtered = tableData
    .filter(([id, name, advName]) =>
      [id, name, advName]
        .map(String)
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
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

  // ✅ Handle Edit Click
  const handleEdit = (rowIndex: number) => {
    const clusterToEdit = clusters[rowIndex];
    if (clusterToEdit) navigate(`/admin/clusters/edit/${clusterToEdit.id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">CLUSTER MANAGEMENT</h2>

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
