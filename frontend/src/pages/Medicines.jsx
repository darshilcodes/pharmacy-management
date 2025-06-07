import React, { useContext, useRef, useState } from "react";
import AppContext from "../context/AppContext";
import { FiSearch } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

const Medicines = () => {
  const { medicines } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const medRef = useRef();

  const handlePrint = useReactToPrint({
    content : medRef.current,
    documentTitle: Date.now(),
    contentRef: medRef
  })

  const getExpiryStatus = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    if (expiry < now) return "expired";
    if (diffDays <= 30) return "expiring-soon";
    return "valid";
  };

  const filteredMedicines = medicines.filter((med) => {
    const search = searchTerm.toLowerCase();
    return (
      med.name.toLowerCase().includes(search) ||
      med.batchNumber.toLowerCase().includes(search) ||
      med.manufacturer.toLowerCase().includes(search)
    );
  });

  return (
    <div className="ml-4 mt-4 min-w-[70%]">
    

      {/* 🔍 Search Bar */}

      <div className="mb-4  w-1/2">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, batch number or manufacturer"
            className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredMedicines.length === 0 ? (
        <p className="text-center text-gray-500">No medicines found.</p>
      ) : (
        <div>
        <div ref={medRef} className="bg-white overflow-y-auto max-h-[calc(95vh-160px)] rounded shadow border print:overflow-visible print:max-h-none">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="sticky top-0 bg-primary text-white shadow-md">
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
              {filteredMedicines.map((med,index) => {
                const expiryStatus = getExpiryStatus(med.expiryDate);
                const isLowStock = med.quantity < 10;

                return (
                  <tr
                    key={med._id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="px-5 py-3 font-medium">{index+1}</td>
                    <td className="px-5 py-3 font-medium">{med.name}</td>
                    <td className="px-5 py-3 uppercase tracking-wider font-mono">
                      {med.batchNumber}
                    </td>
                    <td className="px-5 py-3">{med.manufacturer}</td>
                    <td
                      className={`px-5 py-3 font-semibold ${
                        expiryStatus === "expired"
                          ? "text-red-600"
                          : expiryStatus === "expiring-soon"
                          ? "text-yellow-600"
                          : "text-gray-800"
                      }`}
                      title={`Expiry Date: ${new Date(med.expiryDate).toLocaleDateString("en-GB")}`}
                    >
                      {new Date(med.expiryDate).toLocaleDateString()}
                    </td>
                    <td
                      className={`px-5 py-3 font-semibold ${
                        isLowStock ? "text-red-600" : "text-gray-900"
                      }`}
                      title={isLowStock ? "Low stock" : undefined}
                    >
                      {med.quantity}
                    </td>
                    <td className="px-5 py-3">
                      ₹{med.pricePerUnit.toFixed(2)}
                    </td>
                    <td className="px-5 py-3">{med.category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
         
        </div>
       <div className="flex justify-end  mt-4">
  <button
    onClick={handlePrint}
    className="bg-primary  hover:bg-indigo-500 text-white px-4 py-2 rounded shadow"
  >
    🖨️ Print Data
  </button>
</div>

        </div>

        
      )}
    </div>
  );
};

export default Medicines;
