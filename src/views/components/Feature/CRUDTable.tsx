import React, { useState } from "react";
import { FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CRUDTableProps {
  columns: string[];
  // Allow React nodes (e.g. JSX elements) in table cells
  data: (string | number | React.ReactNode)[][];
  // Optional edit callback if you choose to use it instead of inline buttons
  onEdit?: (rowIndex: number) => void;
  itemsPerPage?: number;
  itemLabel?: string;
  addButtonLabel?: string;
  onAdd?: () => void;
  idColumnIndex?: number;
}

const CRUDTable: React.FC<CRUDTableProps> = ({
  columns,
  data,
  onEdit,
  itemsPerPage = 5,
  itemLabel = "items",
  addButtonLabel = "Add",
  onAdd,
  idColumnIndex = 0,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const navigate = useNavigate();

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-white text-[#4B5563] uppercase sticky top-0 z-10 shadow-md">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3.5">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`transition hover:bg-gray-50 text-[#4B5563] font-semibold ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-[#F3F4F6]"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-4.5">
                  {cell}
                </td>
              ))}
              {/* Optional Edit button if callback provided */}
              {onEdit && (
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEdit(rowIndex)}
                    className="text-[#09984B] border rounded-full px-2 py-1 flex items-center gap-1"
                  >
                    Edit <FaEdit />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 py-2 bg-white border-t border-t-[#F3F4F6] text-sm">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} {itemLabel}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded text-gray-600 hover:text-gray-800 disabled:opacity-50 cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded text-gray-600 hover:text-gray-800 disabled:opacity-50 cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>

        {onAdd && (
          <div>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-[#09984B] text-white rounded-md hover:bg-[#016630] transition cursor-pointer"
            >
              {addButtonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRUDTable;
