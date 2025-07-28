import React, { useState, useEffect } from "react";
import * as Components from "../../../../components";
import { useNavigate } from "react-router-dom";

type StudentRow = [string | number, string, string, string];

const ViewStudent: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [studentData, setStudentData] = useState<StudentRow[]>([]);

  useEffect(() => {
    // TODO: Fetch or receive studentData here
    // Example: API call to load student rows into state
    // setStudentData(fetchedData);
  }, []);

  const handleEdit = (index: number) => {
    console.log("Edit student at index", index);
  };

  const handleAddStudent = () => {
    navigate("/admin/students/add");
  };

  const filteredData = studentData
    .filter(([id, name, email]) =>
      [id, name, email]
        .map(String)
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
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
        idColumnIndex={0}
      />
    </div>
  );
};

export default ViewStudent;
