import React, { useState, useEffect, useContext } from "react";
import * as Components from "../../../../components";
import { useNavigate } from "react-router-dom";
import { ClusteringContext, type Student } from '../../../../../contexts/clustering';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Student Row: student_id, name, program_and_grade, cluster_name, actions
type StudentRow = (string | React.ReactNode | null)[];

const ViewStudent: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(ClusteringContext);

  if (!context) {
    throw new Error('ViewStudent must be used within a ClusteringProvider');
  }

  const { students, clusters, loading, deleteStudent } = context;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [toDelete, setToDelete] = useState<Student | null>(null);

  // Compute cluster name
  const getClusterName = (clusterId?: number | null) => {
    const cluster = clusters.find(c => c.id === clusterId);
    return cluster ? cluster.name : 'Unassigned';
  };

  // Filter + Sort
  const filteredStudents = students
    .filter(s =>
      [s.student_id, s.name, s.program_and_grade, getClusterName(s.cluster)]
        .map(String)
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortValue === "name-asc") return (a.name || '').localeCompare(b.name || '');
      if (sortValue === "name-desc") return (b.name || '').localeCompare(a.name || '');
      if (sortValue === "id-asc") return String(a.student_id).localeCompare(String(b.student_id));
      if (sortValue === "id-desc") return String(b.student_id).localeCompare(String(a.student_id));
      return 0;
    });

  // Build table data
  const tableData: StudentRow[] = filteredStudents.map((s) => [
    s.student_id,
    s.name || "N/A",
    s.program_and_grade,
    getClusterName(s.cluster),
    <div className="flex flex-row gap-1 items-center" key={s.id}>
      <button
        onClick={() => navigate(`/admin/students/edit/${s.id}`)}
        className="text-[#09984B] border rounded-full px-2 py-1 flex items-center gap-1"
      >
        Edit <FaEdit />
      </button>
      <button
        onClick={() => setToDelete(s)}
        className="text-red-600 w-7 h-7 border rounded-full px-2 py-1 flex items-center gap-1"
      >
        <FaTrashAlt />
      </button>
    </div>
  ]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteStudent(toDelete.id);
    } catch (err) {
      console.error('Failed to delete student:', err);
    } finally {
      setToDelete(null);
      window.location.reload(); // Refresh to reflect deletion
    }
  };

  const handleAddStudent = () => navigate("/admin/students/add");

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
          data={tableData}
          itemLabel="student"
          addButtonLabel="Add Student (CSV)"
          onAdd={handleAddStudent}
        />
      )}

      {/* Delete Confirmation Modal */}
      {toDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete student <strong>{toDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setToDelete(null)}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudent;
