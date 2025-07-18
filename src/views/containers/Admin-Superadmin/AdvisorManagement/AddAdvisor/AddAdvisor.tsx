import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaArrowLeft } from "react-icons/fa";

const AddAdvisor = () => {
  const navigate = useNavigate(); 
  const [advisorId, setAdvisorId] = useState("");
  const [advisorName, setAdvisorName] = useState("");
  const [advisorEmail, setAdvisorEmail] = useState("");
  const [cluster, setCluster] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const advisorData = {
      id: advisorId,
      name: advisorName,
      email: advisorEmail,
      cluster: cluster,
    };

    console.log("New Advisor:", advisorData);

    setAdvisorId("");
    setAdvisorName("");
    setAdvisorEmail("");
    setCluster("");
  };

  const handleBack = () => {
    navigate("/admin/advisors/view");
  };

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
        <h2 className="text-2xl font-bold mb-4">ADD ADVISOR</h2>

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
              className="w-full px-4 py-2 border-[#777777] border-1 rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
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
              className="w-full px-4 py-2 border-[#777777] border-1 rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
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
              className="w-full px-4 py-2 border-[#777777] border-1 rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cluster
            </label>
            <select
              value={cluster}
              onChange={(e) => setCluster(e.target.value)}
              required
              className="w-full px-4 py-2 border-[#777777] border-1 rounded-md focus:outline-none focus:ring focus:ring-[#09984B]"
            >
              <option value="">Select a cluster</option>
              <option value="Cluster A">Cluster A</option>
              <option value="Cluster B">Cluster B</option>
              <option value="Cluster C">Cluster C</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-fit px-6 py-2 bg-[#09984B] text-white rounded-md hover:bg-[#016630] transition cursor-pointer"
          >
            Add Advisor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvisor;
