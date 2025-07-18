import * as Components from "../../../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const advisorData = [
  ["123456789", "John Leeroy Gadiane", "johnleeroy@example.com", "Cluster A"],
  ["123456788", "Josephine Petralba", "josephine@example.com", "Cluster B"],
  ["123456787", "Khiara Rubia", "khiara@example.com", "Cluster C"],
];

const ViewAdvisor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const navigate = useNavigate(); 

  // Filtered and sorted data
  const filteredData = advisorData
    .filter(([id, name, email]) =>
      [id, name, email].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortValue === "name-asc") return a[1].localeCompare(b[1]);
      if (sortValue === "name-desc") return b[1].localeCompare(a[1]);
      if (sortValue === "id-asc") return String(a[0]).localeCompare(String(b[0]));
      if (sortValue === "id-desc") return String(b[0]).localeCompare(String(a[0]));
      return 0;
    });

  const handleEdit = (index: number) => {
    console.log("Edit advisor at index", index);
  };

  const handleAddAdvisor = () => {
    navigate("/admin/advisors/add");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ADVISOR MANAGEMENT</h2>

      <Components.CRUDHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        sortValue={sortValue}
        onSortChange={setSortValue}
        placeholder="Search name, ID or email..."
      />

      <Components.CRUDTable
        columns={["ID", "Name", "Email", "Cluster", "Actions"]}
        data={filteredData}
        onEdit={handleEdit}
        itemLabel="advisors"
        addButtonLabel="Add Advisor"
        onAdd={handleAddAdvisor}
      />
    </div>
  );
};

export default ViewAdvisor;
