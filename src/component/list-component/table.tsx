import React from 'react';
import type { InsuranceFormData } from '../../types/list';

interface TableProps {
  data: InsuranceFormData[];
  columns: string[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item["Full Name"]}
              </th>
              <td className="px-6 py-4">{item.Age}</td>
              <td className="px-6 py-4">{item.Gender}</td>
              <td className="px-6 py-4">{item["Insurance Type"]}</td>
              <td className="px-6 py-4">{item.City}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 