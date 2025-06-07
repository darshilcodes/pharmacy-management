import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import phRouter from './routers/phRouter.js';
import medicineRouter from './routers/medicineRouter.js';

dotenv.config();
const app = express();
connectDB();

const allowedOrigins = [
  'http://localhost:3000',   // For development
  'http://localhost:3001',   // Your actual frontend dev port
  'https://pharmacy-management-lac9-k8aaqxan4-darshilcodes-projects.vercel.app/' // ✅ Your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // If you send cookies or auth headers
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/pharmacist',phRouter);
app.use('/medicine',medicineRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
