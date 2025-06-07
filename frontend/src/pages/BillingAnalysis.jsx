import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../context/appContext';
import { useReactToPrint } from 'react-to-print';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BillingAnalysis = () => {
    const { token } = useContext(AppContext);
    const [bills, setBills] = useState([]);
    const [bill, setBill] = useState({ medicines: [] });
    const billRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => billRef.current,
        contentRef: billRef
    });

    const onClickPrint = (item) => {
        setBill(item);
        setTimeout(() => {
            handlePrint();
        }, 200);
    };

    useEffect(() => {
        const fetchBillData = async () => {
            try {
                const res = await axios.get(`${backendUrl}/medicine/get-bill-data`, {
                    headers: { token }
                });
                setBills(res.data.bills);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBillData();
    }, [token]);

    return bills.length > 0 ? (
        <div className="m-4">
            {/* Bill List Table */}
            <h2 className="text-2xl   mb-4">All Bills</h2>
            <div className="bg-white overflow-y-auto max-h-[calc(95vh-160px)] rounded-lg shadow border">
                <table className="min-w-[60vw] text-sm text-left border-collapse">
                    <thead className="sticky top-0 bg-primary text-white shadow-md">
                        <tr>
                            <th className="border px-5 py-2">Bill ID</th>
                            <th className="border px-5 py-2">Patient Name</th>
                            <th className="border px-5 py-2">Phone</th>
                            <th className="border px-5 py-2">Amount</th>
                            <th className="border px-5 py-2">Date</th>
                            <th className="border px-5 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{item.billId}</td>
                                <td className="border px-4 py-2">{item.patientName}</td>
                                <td className="border px-4 py-2">{item.patientPhone}</td>
                                <td className="border px-4 py-2">₹{item.totalAmount}</td>
                                <td className="border px-4 py-2">
                                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="border  px-4 py-2">
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => onClickPrint(item)}
                                            className="bg-primary text-white px-3 py-1 rounded hover:bg-indigo-500"
                                        >
                                            Print
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Hidden Printable Bill */}
            <div ref={billRef} className="hidden print:block p-4 text-black bg-white">
                <h2 className="text-xl font-bold mb-2">Pharmacy Bill</h2>
                <p><strong>Bill No:</strong> {bill.billNumber || bill.billId}</p>
                <p><strong>Patient:</strong> {bill.patientName}</p>
                <p><strong>Phone:</strong> {bill.patientPhone}</p>

                <table className="w-full mt-4 border border-gray-400 text-sm">
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
                        {bill.medicines.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border p-2">{item.medicineName}</td>
                                <td className="border p-2">{item.batchNumber}</td>
                                <td className="border p-2">{item.selectedQty}</td>
                                <td className="border p-2">₹{item.pricePerUnit}</td>
                                <td className="border p-2">
                                    ₹{Number(item.total || item.totalPrice || 0).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right mt-4">
                    <p className="font-semibold">Total: ₹{Number(bill.totalAmount || 0).toFixed(2)}</p>
                </div>
            </div>
        </div>
    ) : (
        <div className="p-6 text-center text-gray-500 text-lg">Loading...</div>
    );
};

export default BillingAnalysis;
