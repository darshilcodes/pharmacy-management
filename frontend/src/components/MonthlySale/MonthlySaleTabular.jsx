import React from 'react';

const MonthlySaleTabular = ({ chartData, totalSale }) => {
  return (
    <div className="py-2 px-2">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-2 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-200">
                Month
              </th>
              <th className="px-6 py-2 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-200">
                Total Sale (₹)
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {chartData.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
              >
                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-200">
                  {item.month}
                </td>
                <td className="px-6 py-2 whitespace-nowrap border-b border-gray-200">
                  ₹{item.sales.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-indigo-100 font-semibold">
              <td className="px-6 py-2 border-t border-gray-300">Total</td>
              <td className="px-6 py-2 border-t border-gray-300">₹{totalSale.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MonthlySaleTabular;
