// src/component/list-component/table.tsx

import React, { useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  TableInstance,
  Column,
  HeaderGroup,
  Row,
  Cell,
  ColumnInstance,
} from "react-table";
import Select from "react-select";
import type { InsuranceFormData } from "../../types/list";

interface TableProps {
  data: InsuranceFormData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const columns = useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            Header: key,
            accessor: key,
          }))
        : [],
    [data]
  );

  const [selectedColumns, setSelectedColumns] = useState(columns);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<InsuranceFormData>(
    {
      columns: selectedColumns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleColumnChange = (selectedOptions: any) => {
    setSelectedColumns(selectedOptions.map((option: any) => option.value));
  };

  const columnOptions = columns.map((column) => ({
    value: column,
    label: column.Header,
  }));

  return (
    <div className="relative overflow-x-auto">
      <Select
        isMulti
        options={columnOptions}
        defaultValue={columnOptions}
        onChange={handleColumnChange}
        className="mb-4"
      />
      <table
        {...getTableProps()}
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup: HeaderGroup<InsuranceFormData>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: ColumnInstance<InsuranceFormData>) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: Row<InsuranceFormData>) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {row.cells.map((cell: Cell<InsuranceFormData>) => (
                  <td {...cell.getCellProps()} className="px-6 py-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;