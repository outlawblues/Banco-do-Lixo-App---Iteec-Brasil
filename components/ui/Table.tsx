
import React from 'react';

interface TableProps<T> {
  columns: { header: string; accessor: keyof T | ((item: T) => React.ReactNode) }[];
  data: T[];
  title?: string;
  actions?: React.ReactNode;
}

const Table = <T extends { id: string | number },>(
  { columns, data, title, actions }: TableProps<T>
): React.ReactElement => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : String(item[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Table;
