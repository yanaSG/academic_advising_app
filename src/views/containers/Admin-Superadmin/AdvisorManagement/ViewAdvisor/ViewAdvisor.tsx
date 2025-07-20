import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Components from "../../../../components";

interface Advisor {
  advisor_id: number;
  name: string;
  email: string;
  cluster?: {
    name: string;
  } | null;
}

const ViewAdvisor = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get<Advisor[]>("http://127.0.0.1:8000/api/clustering/advisors/")
      .then((res) => {
        setAdvisors(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch advisors:", err);
      });
  }, []);


  const filteredData = advisors
    .filter((advisor) =>
      [advisor.advisor_id, advisor.name, advisor.email]
        .map((f) => String(f).toLowerCase())
        .some((val) => val.includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortValue === "name-asc") return a.name.localeCompare(b.name);
      if (sortValue === "name-desc") return b.name.localeCompare(a.name);
      if (sortValue === "id-asc") return String(a.advisor_id).localeCompare(String(b.advisor_id));
      if (sortValue === "id-desc") return String(b.advisor_id).localeCompare(String(a.advisor_id));
      return 0;
    })
    .map((advisor) => [
      advisor.advisor_id,
      advisor.name,
      advisor.email,
      advisor.cluster?.name || "No Cluster",
    ]);

  const handleEdit = (index: number) => {
    console.log("Edit advisor at index", index);
  };

  const handleAddAdvisor = () => {
    navigate("/admin/advisors/add");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ADVISOR MANAGEMENT</h2>

      <Components.CRUDHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        sortValue={sortValue}
        onSortChange={setSortValue}
        placeholder="Search name, ID or email..."
      />

      <Components.CRUDTable
        columns={["Advisor ID", "Name", "Email", "Cluster", "Actions"]}
        data={filteredData}
        onEdit={handleEdit}
        itemLabel="advisors"
        addButtonLabel="Add Advisor"
        onAdd={handleAddAdvisor}
      />
    </div>
  );
};

export default ViewAdvisor;
