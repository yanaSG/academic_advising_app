// src/views/containers/Admin-Superadmin/ClusterManagement/EditCluster/EditCluster.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import type { Advisor, Cluster, Student } from '../../../../../contexts/clustering';

// ---- Types for PCA response ----
type PCATopFeature = {
  feature_key: string;
  loading: number;       // signed (used for color)
  abs_loading: number;   // magnitude (unused in UI but kept for completeness)
};
type PCAItem = {
  pc_number: number;
  explained_variance_ratio: number;
  top_features: PCATopFeature[];
};
type PCAResponse = {
  upload_id: string;
  cluster_id: number; // PK in response
  pcs: PCAItem[];
};

const EditCluster: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clusterIdNum = Number(id);

  // Local form state
  const [displayId, setDisplayId] = useState<string>(''); // DB PK shown read-only
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [advisorId, setAdvisorId] = useState<number | ''>('');

  // Data lists
  const [allAdvisors, setAllAdvisors] = useState<Advisor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // PCA insights (structured for color rendering)
  const [pcaData, setPcaData] = useState<PCAItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Cluster detail
        const clRes = await axios.get<Cluster & { advisor_name?: string }>(
          `http://127.0.0.1:8000/api/clustering/clusters/${clusterIdNum}/`
        );
        const cl = clRes.data;
        setDisplayId(String(cl.id));      // show DB PK (1..4)
        setName(cl.name);
        setDescription(cl.description);
        setAdvisorId(cl.advisor ?? '');

        // 2) Advisors
        const advRes = await axios.get<Advisor[]>(
          'http://127.0.0.1:8000/api/clustering/advisors/'
        );
        setAllAdvisors(advRes.data);

        // 3) Students in this cluster (by PK)
        const stuRes = await axios.get<Student[]>(
          `http://127.0.0.1:8000/api/clustering/students/?cluster=${clusterIdNum}`
        );
        setStudents(stuRes.data);

        // 4) PCA insights (structured; do NOT append into description)
        const pcaRes = await axios.get<PCAResponse>(
          `http://127.0.0.1:8000/api/clustering/clusters/${clusterIdNum}/pca-top-features/?top_pcs=3&top_features=3`
        );
        setPcaData(pcaRes.data?.pcs ?? []);
      } catch (err) {
        console.error('Error loading cluster data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clusterIdNum]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/clustering/clusters/${clusterIdNum}/`,
        {
          name,
          description,
          advisor: advisorId === '' ? null : advisorId,
        }
      );
      navigate('/admin/clusters/view');
      window.location.reload();
    } catch (err) {
      console.error('Failed to update cluster:', err);
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  // Advisors available: unassigned or assigned to this cluster
  const advisorOptions = allAdvisors.filter(
    (a) => a.cluster == null || a.cluster === clusterIdNum
  );

  return (
    <div className="p-4">
      <button
        onClick={() => navigate('/admin/clusters/view')}
        className="mb-4 flex items-center text-[#09984B] hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Cluster View
      </button>

      <h2 className="text-2xl font-bold mb-4">EDIT CLUSTER</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cluster ID</label>
            <input
              value={displayId}
              readOnly
              className="mt-1 w-full px-3 py-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-[#09984B]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-[#09984B]"
            />
          </div>

          {/* PCA Insights (read-only, with color for sign) */}
          {pcaData.length > 0 && (
            <div className="sm:col-span-2 mt-2 p-3 border rounded-md bg-gray-50">
              <h3 className="font-medium mb-2">PCA Insights</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {pcaData.map((pc) => {
                  const evrPct = (pc.explained_variance_ratio * 100).toFixed(1);
                  return (
                    <li key={pc.pc_number}>
                      <span className="font-semibold mr-1">
                        {`PC${pc.pc_number} (${evrPct}%):`}
                      </span>
                      {pc.top_features.map((tf, idx) => {
                        const isPos = tf.loading >= 0;
                        const colorClass = isPos ? 'text-green-600' : 'text-red-600';
                        const value = tf.loading.toFixed(2);
                        return (
                          <span key={tf.feature_key + idx}>
                            <span className="mr-1">{tf.feature_key}</span>
                            <span className={`${colorClass} font-bold`}>
                              ({value})
                            </span>
                            {idx < pc.top_features.length - 1 ? <span>, </span> : null}
                          </span>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Advisor</label>
            <div className="flex justify-between items-center gap-4">
              <div className="flex-grow max-w-lg">
                <select
                  value={advisorId}
                  onChange={(e) =>
                    setAdvisorId(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-[#09984B]"
                >
                  <option value="">Unassigned</option>
                  {advisorOptions.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.email})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-[#09984B] text-white rounded-md hover:bg-[#016630] transition whitespace-nowrap"
              >
                Update Cluster
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">
              <strong>Students in this cluster:</strong> {students.length}
            </p>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {students.map((s) => (
                <li key={s.id}>
                  {s.student_id} – {s.name ?? 'Unnamed'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCluster;
