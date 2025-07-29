import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface CRUDHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  placeholder?: string;
}

const CRUDHeader: React.FC<CRUDHeaderProps> = ({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative z-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

      {/* Search Input */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full sm:w-1/2 px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />

      {/* Custom Styled Sort Dropdown */}
      <div className="relative w-full sm:w-auto z-[-999]">
        <select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none w-full sm:w-48 px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 pr-10"
        >
          <option value="">Sort by</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="id-asc">ID Ascending</option>
          <option value="id-desc">ID Descending</option>
          {/* <option value="students-asc"># of Students Ascending</option>
          <option value="students-desc"># of Students Descending</option> */}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          <FaChevronDown size={12} />
        </div>
      </div>
    </div>
  );
};

export default CRUDHeader;
