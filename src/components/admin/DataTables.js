import React, { useState, useMemo } from "react";
import Pagination from "../Pagination";

const DataTable = ({ data = [], columns = [], filterKey = "name" }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState(null);

  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  // Filtering
  const filteredData = useMemo(() => {
    return search
      ? safeData.filter((item) =>
          item[filterKey]?.toLowerCase().includes(search.toLowerCase())
        )
      : safeData;
  }, [safeData, search, filterKey]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (accessor) => {
    setSortConfig((prev) => {
      if (prev?.key === accessor) {
        return {
          key: accessor,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: accessor, direction: "asc" };
    });
  };

  return (
    <div className="w-full">
      {/* Search and Page Info */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder={`Search by ${filterKey}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-64"
        />
        <div>
          Page {page} of {totalPages}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                  className="p-3 text-left border-b cursor-pointer"
                >
                  {col.label}
                  {sortConfig?.key === col.accessor &&
                    (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center">
                  No data found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.accessor} className="p-3 border-b">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default DataTable;
