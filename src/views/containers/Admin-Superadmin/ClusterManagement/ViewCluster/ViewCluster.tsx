import { useEffect, useState } from "react";
import axios from "axios";
import * as Components from "../../../../components";

const ViewCluster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [clusterData, setClusterData] = useState<(string | number)[][]>([]);
  const [loading, setLoading] = useState(true);

  const handleEdit = (index: number) => {
    console.log("Edit cluster at index", index);
  };

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/clustering/clusters/");
        const formattedData = (response.data as any[]).map((cluster) => [
          cluster.cluster_id,
          cluster.name,
          cluster.advisor?.name || "No Advisor",
          cluster.student_count || 0,
        ]);
        setClusterData(formattedData);
      } catch (error) {
        console.error("Error fetching clusters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  const filteredData = clusterData
    .filter(([id, name, advisor]) =>
      [id, name, advisor].some((field) =>
        String(field).toLowerCase().includes(searchTerm.toLowerCase())
      )
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
      <h2 className="text-2xl font-bold mb-4">CLUSTER MANAGEMENT</h2>

      <Components.CRUDHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        sortValue={sortValue}
        onSortChange={setSortValue}
        placeholder="Search by ID, name, or advisor..."
      />

      {loading ? (
        <div className="text-gray-500">Loading clusters...</div>
      ) : (
        <Components.CRUDTable
          columns={["ID", "Name", "Advisor In Charge", "# of Students", "Actions"]}
          data={filteredData}
          onEdit={handleEdit}
          itemLabel="clusters"
          idColumnIndex={0} // assumes ID is in column index 0
        />
      )}
    </div>
  );
};

export default ViewCluster;
