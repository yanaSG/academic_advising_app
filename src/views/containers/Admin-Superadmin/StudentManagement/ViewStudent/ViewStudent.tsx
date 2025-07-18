import { useState } from "react";
import * as Components from "../../../../components";
import { useNavigate } from "react-router-dom"; 

const studentData = [
  ["20220001", "Alice Reyes", "alice@example.com", "Cluster A"],
  ["20220002", "Brian Santos", "brian@example.com", "Cluster B"],
  ["20220003", "Carla Dela Cruz", "carla@example.com", "Cluster C"],
];

const ViewStudent = () => {
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");

  const handleEdit = (index: number) => {
    console.log("Edit student at index", index);
  };

  const handleAddStudent = () => {
    navigate("/admin/students/add");
  };

  const filteredData = studentData
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">STUDENT MANAGEMENT</h2>

      <Components.CRUDHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        sortValue={sortValue}
        onSortChange={setSortValue}
        placeholder="Search by ID, name, or email..."
      />

      <Components.CRUDTable
        columns={["ID", "Name", "Email", "Cluster", "Actions"]}
        data={filteredData}
        onEdit={handleEdit}
        itemLabel="students"
        addButtonLabel="Add Student"
        onAdd={handleAddStudent}
      />
    </div>
  );
};

export default ViewStudent;
