import { useState } from "react";

const AvailableMedicines = ({
  medicine,
  stock,
  quantities,
  handleQuantityChange,
  handleAddToBill,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = medicine.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="  mt-3">
      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 border border-black rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No matching medicines found.</p>
      ) : (
        <div className="overflow-x-auto max-h-[35vh] border rounded shadow-sm">
          <table className="min-w-full text-sm border">
            <thead className="bg-primary text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-1 text-left">Name</th>
                <th className="px-4 py-1">Batch</th>
                <th className="px-4 py-1">Manufacturer</th>
                <th className="px-4 py-1">Expiry</th>
                <th className="px-4 py-1">Category</th>
                <th className="px-4 py-1">Stock</th>
                <th className="px-4 py-1">Price/unit</th>
                <th className="px-4 py-1">Qty</th>
                <th className="px-4 py-1">Add</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((med) => (
                <tr key={med._id} className="text-center bg-gray-50 hover:bg-gray-300">
                  <td className="px-4 py-1 text-left">{med.name}</td>
                  <td className="px-4 py-1">{med.batchNumber}</td>
                  <td className="px-4 py-1">{med.manufacturer}</td>
                  <td className="px-4 py-1">
                    {new Date(med.expiryDate).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-4 py-1">{med.category}</td>
                  <td className="px-4 py-1">{stock[med._id]}</td>
                  <td className="px-4 py-1">₹{med.pricePerUnit.toFixed(2)}</td>
                  <td className="px-4 py-1">
                    <input
                      type="number"
                      min={0}
                      max={stock[med._id]}
                      value={quantities[med._id] !== undefined ? quantities[med._id] : ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleQuantityChange(med._id, value === "" ? "" : parseInt(value));
                      }}
                      className="w-16 border border-gray-500 px-2 py-1 rounded text-center"
                    />

                  </td>
                  <td className="px-4 py-1">
                    <button
                      onClick={() => handleAddToBill(med)}
                      className="bg-primary text-white px-3 py-1 rounded hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AvailableMedicines;
