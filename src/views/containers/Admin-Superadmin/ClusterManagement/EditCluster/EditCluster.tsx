import { useLocation } from "react-router-dom";

const EditCluster = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Cluster</h2>
      <p>Editing cluster with ID: <strong>{id}</strong></p>
      {/* Fetch cluster data using ID here */}
    </div>
  );
};

export default EditCluster;
