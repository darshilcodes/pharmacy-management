import { FiTrash } from "react-icons/fi";

const BillSummary = ({
  patientName,
  setPatientName,
  patientPhone,
  setPatientPhone,
  billItems,
  handleRemoveItem,
  totalAmount,
  makeBill,
  billNumber,
  isGenerating

}) => {
  return (
    <div className="bg-white border rounded-lg shadow p-2">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary">🧾 Bill Summary</h3>
        <p className="text-sm text-gray-600">Bill ID: {billNumber}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 text-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-1/2">
          <label className="font-semibold whitespace-nowrap">Patient:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
            className="border border-black rounded px-3 py-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-1/2">
          <label className="font-semibold whitespace-nowrap">Phone:</label>
          <input
            type="text"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            placeholder="Enter phone number"
            className="border border-black rounded px-3 py-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      <div className="overflow-y-auto bg-gray-100 h-[33vh] border rounded shadow-sm">
        <table className="min-w-full text-sm border table-fixed">
          <thead className="bg-gray-500 text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-1 text-left w-[25%]">Medicine</th>
              <th className="px-4 py-1 text-center w-[15%]">Batch Number</th>
              <th className="px-4 py-1 w-[10%]">Qty</th>
              <th className="px-4 py-1 w-[15%]">Unit Price</th>
              <th className="px-4 py-1 w-[15%]">Total</th>
              <th className="px-4 py-1 w-[15%]">Remove</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item) => (
              <tr key={item._id} className="text-center hover:bg-white">
                <td className="px-4 py-1 text-left">{item.name}</td>
                <td className="px-4 py-1">{item.batchNumber}</td>
                <td className="px-4 py-1">{item.selectedQty}</td>
                <td className="px-4 py-1">₹{item.pricePerUnit}</td>
                <td className="px-4 py-1">₹{item.total.toFixed(2)}</td>
                <td className="px-4 py-1">
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Remove item"
                  >
                    <FiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="text-gray-500 font-semibold text-sm">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </div>
        <button
          onClick={makeBill}
          disabled={isGenerating}
          className={`${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700"
            } text-white font-medium px-8 py-1 rounded shadow`}
        >
          {isGenerating ? "Generating..." : "Make Bill"}
        </button>

      </div>
    </div>

  );
};

export default BillSummary;
