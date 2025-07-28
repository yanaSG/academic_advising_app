// src/views/containers/Admin-Superadmin/AdvisorManagement/EditAdvisor/EditAdvisor.tsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ClusteringContext } from '../../../../../contexts/clustering';
import type { Cluster, Advisor } from '../../../../../contexts/clustering';

const EditAdvisor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const advisorIdNum = Number(id);

  const { advisors, availableClusters, updateAdvisor } = useContext(ClusteringContext);
  const existing = advisors.find((a) => a.id === advisorIdNum);

  // State mirrors form fields
  const [advisorId, setAdvisorId] = useState('');
  const [advisorName, setAdvisorName] = useState('');
  const [advisorEmail, setAdvisorEmail] = useState('');
  const [clusterId, setClusterId] = useState<number | ''>('');

  // Populate when loaded
  useEffect(() => {
    if (existing) {
      setAdvisorId(existing.advisor_id);
      setAdvisorName(existing.name);
      setAdvisorEmail(existing.email);
      setClusterId(existing.cluster ?? '');
    }
  }, [existing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!existing) return;
    try {
      await updateAdvisor(existing.id, {
        advisor_id: advisorId,
        name: advisorName,
        email: advisorEmail,
        cluster: clusterId === '' ? null : clusterId,
      });
      navigate('/admin/advisors/view');
      window.location.reload();
      
    } catch (err) {
      console.error('Failed to update advisor:', err);
    }
  };

  const handleBack = () => {
    navigate('/admin/advisors/view');
  };

  if (!existing) {
    return <div className="p-4 text-red-600">Advisor not found.</div>;
  }

  return (
    <div className="p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-[#09984B] hover:underline cursor-pointer"
      >
        <FaArrowLeft className="mr-2" /> Back to Advisor View
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold mb-4">EDIT ADVISOR</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Advisor ID
            </label>
            <input
              type="text"
              value={advisorId}
              onChange={(e) => setAdvisorId(e.target.value)}
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
              value={advisorName}
              onChange={(e) => setAdvisorName(e.target.value)}
              required
              className="w-full px-4 py-2 border-[#777777] border rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={advisorEmail}
              onChange={(e) => setAdvisorEmail(e.target.value)}
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
              onChange={(e) =>
                setClusterId(e.target.value === '' ? '' : Number(e.target.value))
              }
              className="w-full px-4 py-2 border-[#777777] border rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            >
              <option value="">Select a cluster</option>
              {availableClusters.map((cls: Cluster) => (
                <option key={cls.id} value={cls.id}>
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
            Update Advisor
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdvisor;
