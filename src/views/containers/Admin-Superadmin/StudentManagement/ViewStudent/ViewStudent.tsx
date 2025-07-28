import React, { useState, useEffect, useContext } from "react";
import * as Components from "../../../../components";
import { useNavigate } from "react-router-dom";
import { ClusteringContext, type Student } from '../../../../../contexts/clustering'; // Adjust path to your context

// Define the type for a student row for the table display
type StudentRow = [string, string, string | null, string | null]; // student_id, name, program_and_grade, cluster_name

const ViewStudent: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");

  const context = useContext(ClusteringContext);

  if (!context) {
    throw new Error('ViewStudent must be used within a ClusteringProvider');
  }

  const { students, clusters, loading } = context; // Get students, clusters, loading, and fetchData from context

  // Effect to fetch data on component mount
  useEffect(() => {
    console.log("DEBUG: ViewStudent component mounted, fetching data...", students.length, clusters.length);
    // fetchData is already called on mount in ClusteringProvider,
    // but calling it here ensures this specific view's data is fresh if needed.
    // However, it might cause redundant fetches if not managed carefully.
    // For now, we rely on the context's initial fetch.
    // If you need to force a refresh specific to this view, uncomment:
    // fetchData();
  }, []);

  // Prepare table data from context students
  const studentData: StudentRow[] = students.map((s: Student) => {
    const clusterName = s.cluster !== null
      ? (clusters.find(c => c.cluster_id === s.cluster)?.name || 'Unassigned')
      : 'Unassigned';
    return [
      s.student_id,
      s.name || 'N/A', // Handle null names
      s.program_and_grade,
      clusterName,
    ];
  });

  const handleEdit = (rowIndex: number) => {
    // Assuming you have an edit route like /admin/students/edit/:id
    // You'll need the actual student ID from the 'students' array
    const studentToEdit = students[rowIndex];
    if (studentToEdit) {
      navigate(`/admin/students/edit/${studentToEdit.id}`);
    }
  };

  const handleAddStudent = () => {
    navigate("/admin/students/add");
  };

  const filteredData = studentData
    .filter(([id, name, program, cluster]) =>
      [id, name, program, cluster]
        .map(String)
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortValue === "name-asc") return String(a[1]).localeCompare(String(b[1]));
      if (sortValue === "name-desc") return String(b[1]).localeCompare(String(a[1]));
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
        placeholder="Search by ID, name, program, or cluster..."
      />

      {loading ? (
        <div className="text-gray-500">Loading students…</div>
      ) : (
        <Components.CRUDTable
          columns={["Student ID", "Name", "Program & Grade", "Cluster", "Actions"]}
          data={filteredData}
          itemLabel="student"
          addButtonLabel="Add Student (CSV)"
          onAdd={handleAddStudent}
          onEdit={handleEdit}
          // onDelete={handleDelete} // Implement delete if needed
        />
      )}
    </div>
  );
};

export default ViewStudent;
