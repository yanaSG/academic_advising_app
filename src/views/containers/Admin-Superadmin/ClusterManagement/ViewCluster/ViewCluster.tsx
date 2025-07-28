// src/views/containers/Admin-Superadmin/ClusterManagement/ViewCluster/ViewCluster.tsx
import React, { useState, useContext } from "react";
import * as Components from "../../../../components";
import { ClusteringContext } from "../../../../../contexts/clustering";
import { useNavigate } from 'react-router-dom';

const ViewCluster: React.FC = () => {
  const { clusters, loading } = useContext(ClusteringContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const navigate = useNavigate();

  // build raw table data
  const tableData = clusters.map((c) => [
    c.cluster_id,
    c.name,
    // find advisor name by looking up in context.advisors if you need
    c.advisor_name
      ? clusters.find((cl) => cl.id === c.id && cl.advisor_name === c.advisor_name)?.advisor_name
      : "No Advisor",
    c.student_count,
  ]);

  // filter & sort exactly like you had it
  const filtered = tableData
    .filter(([id, name, adv]) =>
      [id, name, adv]
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
    navigate(`/admin/clusters/edit/${clusters[rowIndex].id}`)
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
          columns={[
            "ID",
            "Name",
            "Advisor In Charge",
            "# of Students",
            "Actions",
          ]}
          data={filtered}
          onEdit={handleEdit}
          itemLabel="clusters"
          idColumnIndex={0}
        />
      )}
    </div>
  );
};

export default ViewCluster;
