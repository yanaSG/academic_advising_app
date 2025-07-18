import { useState } from "react";
import * as Components from "../../../../components";

const clusterData = [
  ["CL001", "Cluster A", "John Leeroy Gadiane", 12],
  ["CL002", "Cluster B", "Josephine Petralba", 8],
  ["CL003", "Cluster C", "Khiara Rubia", 15],
];

const ViewCluster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");

  const handleEdit = (index: number) => {
    console.log("Edit cluster at index", index);
  };



  const filteredData = clusterData
    .filter(([id, name, advisor]) =>
      [id, name, advisor].some((field) =>
        String(field).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortValue === "name-asc") return String(a[1]).localeCompare(String(b[1]));
      if (sortValue === "name-desc") return String(b[1]).localeCompare(String(a[1]));
      if (sortValue === "id-asc") return String(a[0]).localeCompare(String(b[0]));
      if (sortValue === "id-desc") return String(b[0]).localeCompare(String(a[0]));
      // if (sortValue === "students-asc") return Number(a[3]) - Number(b[3]);
      // if (sortValue === "students-desc") return Number(b[3]) - Number(a[3]);
      return 0;
    });

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

      <Components.CRUDTable
        columns={["ID", "Name", "Advisor In Charge", "# of Students", "Actions"]}
        data={filteredData}
        onEdit={handleEdit}
        itemLabel="clusters"
      />

    </div>
  );
};

export default ViewCluster;
