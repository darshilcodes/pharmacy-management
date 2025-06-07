import { forwardRef } from 'react';

const BillPdfData = forwardRef(({ billItems, totalAmount, patientName, patientPhone, billNumber }, ref) => {
  return (
    <div ref={ref} className="print:block p-4"> {/* Removed sr-only */}
      <h2 className="text-xl font-bold mb-2">Pharmacy Bill</h2>
      <p><strong>Bill No:</strong> {billNumber}</p>
      <p><strong>Patient:</strong> {patientName}</p>
      <p><strong>Phone:</strong> {patientPhone}</p>

      <table className="w-full mt-4 border border-gray-400 text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Medicine</th>
            <th className="border p-2">Batch</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price/Unit</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {billItems.map((item, idx) => (
            <tr key={idx}>
              <td className="border p-2">{item.name||item.medicineName}</td>
              <td className="border p-2">{item.batchNumber}</td>
              <td className="border p-2">{item.selectedQty}</td>
              <td className="border p-2">₹{item.pricePerUnit}</td>
             <td className="border p-2">₹{Number(item.total).toFixed(2) ||Number(item.totalPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-4">
        <p className="font-semibold">Total: ₹{Number(totalAmount).toFixed(2) }</p>
      </div>
    </div>
  );
});

export default BillPdfData;