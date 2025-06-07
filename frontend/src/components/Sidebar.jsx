import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaFileInvoice,
  FaPills,
  FaEdit,
  FaPlus,
  FaExclamationCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaFileInvoiceDollar,
  FaUserMd
} from 'react-icons/fa';
import AppContext from '../context/appContext';
 

const Sidebar = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      setToken(null);
      navigate('/');
    }
  };

  const menuItems = [
    { path: '/home', icon: <FaHome />, label: 'Dashboard' },
    { path: '/billing', icon: <FaFileInvoice />, label: 'Make Bill' },
    { path: '/monthly-sale-data', icon: <FaChartBar />, label: 'Monthly Sales Report' },
    { path: '/billing-analysis', icon: <FaFileInvoiceDollar />, label: 'Billing Analysis' },
    { path: '/medicines', icon: <FaPills />, label: 'Medicines' },
    { path: '/add-medi', icon: <FaPlus />, label: 'Add Medicine' },
    { path: '/update-medi', icon: <FaEdit />, label: 'Update Medicine' },
    { path: '/urgent-medi', icon: <FaExclamationCircle />, label: 'Restock Alerts' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' }
  ];

  return (
    <div className="h-screen min-w-64 bg-white border-r shadow-md flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary mb-6">PharmaDesk</h2>
        <ul className="space-y-1">
          {menuItems.map(({ path, icon, label }) => (
            <NavLink
              to={path}
              key={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition ${
                  isActive ? 'bg-indigo-100 border-r-4 border-indigo-500 text-indigo-600 font-semibold' : ''
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md transition"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
