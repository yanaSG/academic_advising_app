// src/views/containers/Admin-Superadmin/AdvisorManagement/ViewAdvisor/ViewAdvisor.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from '../../../../components';
import type { Advisor } from '../../../../../contexts/clustering';
import { ClusteringContext } from '../../../../../contexts/clustering';
import { FaEdit,FaTrashAlt  } from "react-icons/fa";

const ViewAdvisor: React.FC = () => {
  const { advisors, clusters, deleteAdvisor } = useContext(ClusteringContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [toDelete, setToDelete] = useState<Advisor | null>(null);
  const navigate = useNavigate();

  // Get cluster name by ID
  const getClusterName = (clusterId?: number | null) => {
    const cluster = clusters.find(c => c.id === clusterId);
    return cluster ? cluster.name : 'No Cluster';
  };

  // Filter and sort advisors
  const filteredAdvisors = advisors
    .filter(adv =>
      [adv.advisor_id, adv.name, adv.email]
        .map(String)
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortValue === 'name-asc') return a.name.localeCompare(b.name);
      if (sortValue === 'name-desc') return b.name.localeCompare(a.name);
      if (sortValue === 'id-asc') return String(a.advisor_id).localeCompare(String(b.advisor_id));
      if (sortValue === 'id-desc') return String(b.advisor_id).localeCompare(String(a.advisor_id));
      return 0;
    });

  // Build table data (including action buttons)
  const tableData = filteredAdvisors.map((adv, index) => [
    adv.advisor_id,
    adv.name,
    adv.email,
    getClusterName(adv.cluster),
    <div className="flex flex-row gap-2 items-centerv" key={adv.id}>
      <button
        onClick={() => navigate(`/admin/advisors/edit/${adv.id}`)}
        className="text-blue-600 cursor-pointer"
      >
        <FaEdit size={22}/>
      </button>
      <button
        onClick={() => setToDelete(adv)}
        className="text-red-600 cursor-pointer"
      >
        <FaTrashAlt size={20}/>
      </button>
    </div>
  ]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteAdvisor(toDelete.id);
    } catch (err) {
      console.error('Failed to delete advisor:', err);
    } finally {
      setToDelete(null);
      window.location.reload();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ADVISOR MANAGEMENT</h2>

      <Components.CRUDHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        sortValue={sortValue}
        onSortChange={setSortValue}
        placeholder="Search by ID, name, or email..."
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/admin/advisors/add')}
          className="px-4 py-2 bg-[#09984B] text-white rounded hover:bg-[#016630]"
        >
          Add Advisor
        </button>
      </div>

      <Components.CRUDTable
        columns={["Advisor ID", "Name", "Email", "Cluster", "Actions"]}
        data={tableData}
        itemLabel="advisor"
      />

    {/* Delete Confirmation Modal */}
    {toDelete && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
          <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
          <p className="mb-6">
            Are you sure you want to delete <strong>{toDelete.name}</strong>?
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

export default ViewAdvisor;
