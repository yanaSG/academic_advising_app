// src/views/containers/Admin-Superadmin/StudentManagement/EditStudent/EditStudent.tsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ClusteringContext } from '../../../../../contexts/clustering';
import type { Cluster } from '../../../../../contexts/clustering';

const EditStudent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const studentIdNum = Number(id);

  const { students, clusters, updateStudent } = useContext(ClusteringContext);
  const existing = students.find((s) => s.id === studentIdNum);

  // Form states
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [programAndGrade, setProgramAndGrade] = useState('');
  const [clusterId, setClusterId] = useState<string>(''); // store as string

  // Populate form when record is found
  useEffect(() => {
    if (existing) {
      setStudentId(existing.student_id);
      setStudentName(existing.name || '');
      setProgramAndGrade(existing.program_and_grade);
      setClusterId(
        existing.cluster !== null && existing.cluster !== undefined
          ? String(existing.cluster)
          : ''
      );
    }
  }, [existing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!existing) return;

    try {
      await updateStudent(existing.id, {
        student_id: studentId,
        name: studentName || null,
        program_and_grade: programAndGrade,
        cluster: clusterId === '' ? null : Number(clusterId), // convert to number on submit
      });
      navigate('/admin/students/view');
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  const handleBack = () => navigate('/admin/students/view');

  if (!existing) {
    return <div className="p-4 text-red-600">Student not found.</div>;
  }

  return (
    <div className="p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-[#09984B] hover:underline cursor-pointer"
      >
        <FaArrowLeft className="mr-2" /> Back to Student View
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold mb-4">EDIT STUDENT</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="w-full px-4 py-2 border-[#777777] border rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-2 border-[#777777] border rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program & Year/Grade
            </label>
            <input
              type="text"
              value={programAndGrade}
              onChange={(e) => setProgramAndGrade(e.target.value)}
              required
              className="w-full px-4 py-2 border-[#777777] border rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cluster
            </label>
            <select
              value={clusterId}
              onChange={(e) => setClusterId(e.target.value)} // keep as string
              className="w-full px-4 py-2 border-[#777777] border rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            >
              <option value="">Select a cluster</option>
              {clusters.map((cls: Cluster) => (
                <option key={cls.id} value={String(cls.id)}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-fit px-6 py-2 bg-[#09984B] text-white rounded-md hover:bg-[#016630] transition cursor-pointer"
          >
            Update Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
