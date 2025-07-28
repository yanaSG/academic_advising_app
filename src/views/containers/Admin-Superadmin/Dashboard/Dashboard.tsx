import { useState } from "react";
import AdminDashboardCard from "../../../components/UI/AdminDashboardCard";
// import AdminDashboardFilter from "../../../components/UI/AdminDashboardFilter";
// import ExportButton from "../../../components/UI/ExportButton";
// import BookingSummary from "../../../components/Feature/BookingSummary";
import StudentsPerLevel from "../../../components/Feature/StudentsPerLevel";
import StudentClusters from "../../../components/Feature/StudentClusters";
import AdminButton from "../../../components/UI/AdminButton";
import { FaBookBookmark } from "react-icons/fa6";
import { IoPeopleCircle, IoWarning } from "react-icons/io5";
import { FaLayerGroup } from "react-icons/fa";
import StudentsPerProgram from "../../../components/Feature/StudentsPerProgram";

const Dashboard = () => {
  const rooms = [
    { color: "#2563EB", name: "Conference Room" },
    { color: "#10B981", name: "Skyline Room" },
    { color: "#F59E0B", name: "Training Room" },
    { color: "#EF4444", name: "Grand Hall" },
    { color: "#1E40AF", name: "Sky Hall" },
    // Add more rooms here if needed
  ];

  const [studentToggle, setStudentToggle] = useState("byLevel");

  const handleStudentToggle = (toggle: string) => {
    setStudentToggle(toggle);
  };

  return (
    <div className="w-full h-[calc(100vh-6rem)] grid grid-cols-2">
      <div className="flex flex-col">
        <div className="max-h-max grid grid-cols-2 gap-4 p-4">
          <AdminDashboardCard
            label="Students Enrolled"
            icon={<IoPeopleCircle className="size-10 text-amber-400" />}
            value={40}
          />
          <AdminDashboardCard
            label="Professors"
            icon={<IoPeopleCircle className="size-10 text-gray-600" />}
            value={1}
          />
        </div>
        <div className="col-span-2 h-120 bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <h3 className="font-bold text-xl text-[#1F2937]">
              Students Summary
            </h3>
            <div className="flex gap-2 items-center">
              <h4 className="font-semibold">View by:</h4>
              <AdminButton
                label="Year Level"
                onClick={() => handleStudentToggle("byLevel")}
                className={
                  studentToggle === "byProgram"
                    ? "bg-[#606060] hover:bg-[#373737]"
                    : ""
                }
              />
              <AdminButton
                label="Program"
                onClick={() => handleStudentToggle("byProgram")}
                className={
                  studentToggle === "byLevel"
                    ? "bg-[#606060] hover:bg-[#373737]"
                    : ""
                }
              />
            </div>
          </div>

          <div className="h-85 w-full">
            {studentToggle === "byLevel" ? (
              <StudentsPerLevel />
            ) : (
              <StudentsPerProgram />
            )}
          </div>
        </div>
      </div>
      <div className="h-148 bg-white shadow-md rounded-lg p-4 m-5 flex gap-2">
        <StudentClusters />
      </div>
    </div>
  );
};

export default Dashboard;
