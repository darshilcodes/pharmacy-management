import { useContext } from 'react';
import AppContext from './context/AppContext.js';
import LoginPage from './pages/LoginPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import AddMedicine from './pages/AddMedicine.jsx';
import Medicines from './pages/Medicines.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UrgentMedi from './pages/UrgentMedi.jsx';
import Bill from './pages/Billing/Bill.jsx';
import UpdateMedicine from './pages/UpdateMedicine.jsx';
import MonthlySale from './components/MonthlySale/MonthlySale.jsx';
import BillingAnalysis from './pages/BillingAnalysis.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
 
const App = () => {
  const { token, setToken } = useContext(AppContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {token ? (
        <div className='flex items-start bg-[#dde0f5]'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<></>}></Route>
            <Route path='/home' element={<Dashboard></Dashboard>}></Route>
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/add-medi" element={<AddMedicine />} />
            <Route path="/urgent-medi" element={<UrgentMedi/>} />
            <Route path="/billing" element={<Bill></Bill>} />
            <Route path="/update-medi" element={<UpdateMedicine></UpdateMedicine>} />
            <Route path="/monthly-sale-data" element={<MonthlySale></MonthlySale>} />
            <Route path="/billing-analysis" element={<BillingAnalysis></BillingAnalysis>} />
            <Route path="/settings" element={<Settings></Settings>} />
          </Routes>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default App;
