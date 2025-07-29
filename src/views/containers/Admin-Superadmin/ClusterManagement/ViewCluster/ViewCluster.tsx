// src/views/containers/Admin-Superadmin/ClusterManagement/ViewCluster/ViewCluster.tsx
import React, { useState, useContext, useEffect } from "react";
import * as Components from "../../../../components";
import { ClusteringContext, type Cluster, type Advisor } from "../../../../../contexts/clustering"; // Adjust path to your context
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa"; // Assuming you use this icon

const ViewCluster: React.FC = () => {
  const { clusters, advisors, loading } = useContext(ClusteringContext); // Get clusters, advisors, loading, fetchData
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const navigate = useNavigate();

  // Effect to fetch data on component mount
  useEffect(() => {
    // fetchData is already called on mount in ClusteringProvider,
    // but calling it here ensures this specific view's data is fresh if needed.
    // However, it might cause redundant fetches if not managed carefully.
    // For now, we rely on the context's initial fetch.
    // If you need to force a refresh specific to this view, uncomment:
    // fetchData();
  }, []);

  // Helper to get advisor name
  const getAdvisorName = (advisorId: number | null): string => {
    if (advisorId === null) {
      return "No Advisor";
    }
    const advisor = advisors.find((adv: Advisor) => adv.id === advisorId);
    return advisor ? advisor.name : "Unknown Advisor";
  };

  // build raw table data
  const tableData = clusters.map((c: Cluster) => [
    String(c.id), // Ensure cluster_id is string for display/filtering
    c.name,
    getAdvisorName(c.advisor), // Use helper to get advisor name
    String(c.student_count), // Ensure student_count is string for display/filtering
  ]);

  // filter & sort
  const filtered = tableData
    .filter(([id, name, advName]) => // Filter using advisor name from tableData
      [id, name, advName] // Include advisor name in search
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

  const handleEdit = (rowIndex: number) => {
    // Get the actual cluster ID from the original clusters array
    const clusterToEdit = clusters[rowIndex];
    if (clusterToEdit) {
      navigate(`/admin/clusters/edit/${clusterToEdit.id}`);
    }
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
        // Assuming you want an "Add Cluster" button here
        // onAdd={() => navigate('/admin/clusters/add')}
        // addButtonLabel="Add Cluster"
      />

      {loading ? (
        <div className="text-gray-500">Loading clusters…</div>
      ) : (
        <Components.CRUDTable
          columns={[
            "ID",
            "Name",
            "Advisor",
            "Student Count",
            "Actions"
          ]}
          data={filtered}
          itemLabel="cluster"
          onEdit={handleEdit}
          // onDelete={handleDelete} // Implement delete if needed
        />
      )}
    </div>
  );
};

export default ViewCluster;
