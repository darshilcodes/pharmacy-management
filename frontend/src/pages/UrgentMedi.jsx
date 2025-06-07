import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/appContext';
import { FaExclamationTriangle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

const UrgentMedi = () => {
  const { medicines } = useContext(AppContext);
  const [searchItem, setSearchItem] = useState('');
  const [minQuantity, setMinQuantity] = useState(10);
  const pageRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
    contentRef: pageRef,
    documentTitle: Date.now()
  });

  const filteredMedicines = medicines.filter((med) => {
    return (
      (med.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        med.batchNumber.toLowerCase().includes(searchItem.toLowerCase())) &&
      med.quantity < minQuantity
    );
  });

  return (
    <div className="ml-4 mt-4 w-[60%] max-w-7xl">
      {/* 🧠 Title Section */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <FaExclamationTriangle className="text-3xl text-red-600" />
        <h2 className="text-3xl text-red-700 font-semibold tracking-wide">
          Urgent Medicines - Low Inventory Alert
        </h2>
      </div>

      {/* 🔍 Search + Filter */}
      <div className="flex w-full flex-col sm:flex-row gap-4 mb-6 items-center sm:items-end">
        {/* Search Input */}
        <div className="w-full sm:w-2/3 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or batch number"
            className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>

        {/* Threshold Input */}
        <div className="w-full sm:w-1/3">
          <label className="block mb-1 text-sm text-gray-700 font-medium">Threshold Quantity</label>
          <input
            type="number"
            min={0}
            value={minQuantity > 0 ? minQuantity : ''}
            onChange={(e) => setMinQuantity(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 10"
          />
        </div>
      </div>

      {/* 📋 Results Table */}
      {filteredMedicines.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">✅ All stocks are above the threshold.</p>
      ) : (
        <>
          <div
            ref={pageRef}
            className="bg-white overflow-y-auto max-h-[calc(95vh-220px)] rounded shadow border print:overflow-visible print:max-h-none"
          >
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 bg-red-600 text-white shadow-md z-10">
                <tr>
                  <th className="px-5 py-3">Index</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Batch #</th>
                  <th className="px-5 py-3">Manufacturer</th>
                  <th className="px-5 py-3">Expiry Date</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Price (₹)</th>
                  <th className="px-5 py-3">Category</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedicines.map((med, index) => (
                  <tr key={med._id} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="px-5 py-3 font-medium">{index + 1}</td>
                    <td className="px-5 py-3 font-medium">{med.name}</td>
                    <td className="px-5 py-3 uppercase tracking-wide font-mono">{med.batchNumber}</td>
                    <td className="px-5 py-3">{med.manufacturer || 'N/A'}</td>
                    <td className="px-5 py-3">
                      {med.expiryDate
                        ? new Date(med.expiryDate).toLocaleDateString('en-GB')
                        : 'N/A'}
                    </td>
                    <td
                      className={`px-5 py-3 font-bold ${
                        med.quantity < 5 ? 'text-red-700' : 'text-yellow-600'
                      }`}
                      title="Low Stock"
                    >
                      {med.quantity}
                    </td>
                    <td className="px-5 py-3">₹ {med.price || '0.00'}</td>
                    <td className="px-5 py-3">{med.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🖨️ Print Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handlePrint}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
              Print Report
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UrgentMedi;
