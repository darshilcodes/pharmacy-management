import { Router } from "express";
import { addMedicine, getMedicines, updateMedicine, updateStock } from "../controllers/medicineController.js";
import Authenticate from "../middlewares/Auth.js";
import {addBillData, getBillData, getMonthlySaleData } from "../controllers/medicineSaleController.js";
 
const medicineRouter = Router();

medicineRouter.post('/add-medicine', Authenticate, addMedicine);
medicineRouter.get('/get-medicines', Authenticate, getMedicines);
medicineRouter.post('/update-stock',Authenticate, updateStock);
medicineRouter.post('/add-sale-data',Authenticate,addBillData);
medicineRouter.post('/update-medicine',Authenticate,updateMedicine);
medicineRouter.get('/get-monthly-sale',getMonthlySaleData);
medicineRouter.get('/get-bill-data',Authenticate,getBillData);

export default medicineRouter;