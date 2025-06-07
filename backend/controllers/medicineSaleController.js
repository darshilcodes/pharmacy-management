import medicineSaleModel from "../models/medicineSaleModel.js";

const addBillData = async (req, res) => {
    try {
        const reqData = req.body; 

        const purchasedMedicines = [];

        for (const item of reqData.billItems) {
            purchasedMedicines.push({
                medicineName: item.name,
                batchNumber: item.batchNumber,
                quantityPurchased: item.selectedQty,
                expiryDate: item.expiryDate,
                pricePerUnit: item.pricePerUnit,
                totalPrice: item.total
            });
        }

        const saleData = {
            billId: reqData.billNumber,
            totalAmount: reqData.totalAmount,
            patientName: reqData.patientName,
            patientPhone: reqData.patientPhone,
            medicines: purchasedMedicines,
        };

        const newMedicineSaleData = new medicineSaleModel(saleData);
        await newMedicineSaleData.save();

        return res.status(200).json({ success: true, message: "Sale Data added successfully!" });
    } catch (error) {
        console.error("Error adding sale data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getMonthlySaleData = async (req, res) => {
    try {
        const bills = await medicineSaleModel.find({});

        const monthly_data = {}; // e.g., { "2025-06": totalAmount }

        for (const bill of bills) {
            const year = bill.createdAt.getFullYear();
            const month = String(bill.createdAt.getMonth() + 1).padStart(2, "0");
            const key = `${year}-${month}`; // "2025-06"

            if (monthly_data[key]) {
                monthly_data[key] += Number(bill.totalAmount);
            } else {
                monthly_data[key] = Number(bill.totalAmount);
            }
        }
        const sortedMonthlyData = Object.keys(monthly_data)
            .sort((a, b) => new Date(a) - new Date(b))
            .reduce((acc, key) => {
                acc[key] = monthly_data[key];
                return acc;
            }, {});

        return res.json({ success: true, sortedMonthlyData, message: "Monthly data sent successfully!" });

    } catch (error) {
        console.error("Error fetching sale data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getBillData = async (req, res) => {
    try {
        const bills = await medicineSaleModel.find({});
        return res.json({ success: true, bills, message: "Bill data sent successfully!" });

    } catch (error) {
        console.error("Error fetching sale data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export { addBillData, getMonthlySaleData, getBillData };
