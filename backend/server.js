import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import phRouter from './routers/phRouter.js';
import medicineRouter from './routers/medicineRouter.js';
 
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/pharmacist',phRouter);
app.use('/medicine',medicineRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})