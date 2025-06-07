import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import MonthlySaleTabular from "./MonthlySaleTabular";
import MontlySaleBarChart from "./MontlySaleBarChart";
import MonthlySalePieChart from "./MonthlySalePieChart";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const monthNames1 = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

const MonthlySale = () => {
    const [monthly_sale, setMonthly_sale] = useState({});
    const [year, setYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        const fetchMonthlySale = async () => {
            try {
                const res = await axios.get(`${backendUrl}/medicine/get-monthly-sale`);
                const data = res.data.sortedMonthlyData;
                setMonthly_sale(data);

                const years = [
                    ...new Set(Object.keys(data).map((date) => date.split("-")[0])),
                ];
                setAvailableYears(years.sort((a, b) => parseInt(a) - parseInt(b)));
            } catch (error) {
                console.error(error);
            }
        };
        fetchMonthlySale();
    }, []);

    const saleRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => saleRef.current,
        contentRef: saleRef,
    });

    let totalSale = 0;

    const chartData = Object.entries(monthly_sale)
        .filter(([key]) => key.startsWith(String(year)))
        .map(([key, value]) => {
            const [_, month] = key.split("-");
            totalSale += value;
            return {
                month: monthNames1[parseInt(month, 10) - 1],
                sales: value,
            };
        });
    const chartData1 = Object.entries(monthly_sale)
        .filter(([key]) => key.startsWith(String(year)))
        .map(([key, value]) => {
            const [_, month] = key.split("-");
            totalSale += value;
            return {
                month: monthNames[parseInt(month, 10) - 1],
                sales: value,
            };
        });

    return Object.keys(monthly_sale).length > 0 ? (
        <div className="p-3 max-h-[100vh] w-full">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    📊 Monthly Sales Report
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Year Selector */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="year-select" className="text-gray-600 font-medium">
                            Select Year:
                        </label>
                        <select
                            id="year-select"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {availableYears.map((y, idx) => (
                                <option key={idx} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Print Button */}
                    <button
                        onClick={handlePrint}
                        className="bg-primary hover:bg-indigo-500 text-white font-medium px-2 py-1 rounded  "
                    >
                        🖨️ Print Report
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div ref={saleRef} className="flex flex-col lg:flex-row gap-6 mb-6  ">
                {/* Left: Table */}
                <div className="w-[40%] bg-white p-4 rounded shadow ">
                    <h2 className="text-lg font-semibold mb-2">📅 Sale Table</h2>
                    <MonthlySaleTabular chartData={chartData1} totalSale={totalSale} />
                </div>

                {/* Right: Bar chart + Pie chart (stacked vertically) */}
                <div className=" w-full flex flex-col gap-6">
                    <div className="bg-white p-4 rounded shadow ">
                        <h2 className="text-lg font-semibold mb-2">📈 Bar Chart</h2>
                        <MontlySaleBarChart chartData={chartData} />
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">🥧 Pie Chart</h2>
                        <MonthlySalePieChart chartData={chartData} />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="p-6 text-center text-gray-500 text-lg">Loading...</div>
    );
};

export default MonthlySale;
