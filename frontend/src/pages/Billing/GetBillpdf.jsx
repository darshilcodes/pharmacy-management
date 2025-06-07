import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const GetBillpdf = ({ billItems, patientName, patientPhone, totalAmount }) => {
  const billRef = useRef();
//  console.log(billItems);
  
  const generatePDF = async () => {
    const element = billRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`bill-${Date.now()}.pdf`);
  };

  return (
    <div>
      {/* 👇 Bill Section to Convert to PDF */}
      <div ref={billRef} className="p-4 bg-white rounded shadow text-sm">
        <h3 className="text-lg font-bold text-green-700 mb-2">🧾 Bill Summary</h3>
        <p><strong>Patient:</strong> {patientName}</p>
        <p><strong>Phone:</strong> {patientPhone}</p>

        <table className="w-full border border-collapse mt-4 text-xs">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="border px-2 py-1">Medicine</th>
              <th className="border px-2 py-1">Batch No</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Unit Price</th>
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item) => (
              <tr key={item._id}>
                <td className="border px-2 py-1">{item.name }</td>
                <td className="border px-2 py-1">{item.batchNumber}</td>
                <td className="border px-2 py-1">{item.selectedQty}</td>
                <td className="border px-2 py-1">₹{item.pricePerUnit}</td>
                <td className="border px-2 py-1">₹{Number(item.total).toFixed(2) || Number(item.totalPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 font-semibold text-green-800">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      {/* 🖨️ Download Button */}
      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default GetBillpdf;
