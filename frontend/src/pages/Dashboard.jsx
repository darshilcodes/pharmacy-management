import { FaFileInvoiceDollar, FaPills, FaEdit, FaPlusCircle, FaExclamationCircle, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
  <>
      <div className="bg-white h-[100vh] p-8 flex justify-around flex-wrap items-center">
        <div className="h-[100%] w-full bg-[#E2E5FF] flex p-24 flex-wrap justify-around items-center">
          {/* Box 1 */}
          <Link to="/billing" className="h-[35%] w-[28%]">
            <div className="bg-white border rounded-lg p-6 shadow-lg cursor-pointer hover:bg-primary hover:text-white transition duration-300 flex flex-col items-center group">
              <FaFileInvoiceDollar className="text-4xl mb-4 text-primary transition duration-300 group-hover:text-white" />
              <h3 className="text-xl font-semibold text-center mb-2">Make Bill</h3>
              <p className="text-sm text-center">
                Quickly generate invoices and bills for your customers with accurate details.
              </p>
            </div>
          </Link>
          {/* Box 2 */}
          <Link to="/medicines" className="h-[35%] w-[28%]">
            <div className="bg-white border rounded-lg p-6 shadow-lg cursor-pointer hover:bg-primary hover:text-white transition duration-300 flex flex-col items-center group">
              <FaPills className="text-4xl mb-4 text-primary transition duration-300 group-hover:text-white" />
              <h3 className="text-xl font-semibold text-center mb-2">Medicines</h3>
              <p className="text-sm text-center">
                View the complete inventory of medicines available in your store.
              </p>
            </div>
          </Link>
          {/* Box 3 */}
          <Link to="/update-medi" className="h-[35%] w-[28%]">
            <div className="bg-white border rounded-lg p-6 shadow-lg cursor-pointer hover:bg-primary hover:text-white transition duration-300 flex flex-col items-center group">
              <FaEdit className="text-4xl mb-4 text-primary transition duration-300 group-hover:text-white" />
              <h3 className="text-xl font-semibold text-center mb-2">Update Medicines</h3>
              <p className="text-sm text-center">
                Edit details like price, stock, and expiry date of existing medicines.
              </p>
            </div>
          </Link>
          {/* Box 4 */}
          <Link to="/add-medi" className="h-[35%] w-[28%]">
            <div className="bg-white border rounded-lg p-6 shadow-lg cursor-pointer hover:bg-primary hover:text-white transition duration-300 flex flex-col items-center group">
              <FaPlusCircle className="text-4xl mb-4 text-primary transition duration-300 group-hover:text-white" />
              <h3 className="text-xl font-semibold text-center mb-2">Add Medicines</h3>
              <p className="text-sm text-center">
                Add new medicines to your inventory with essential details.
              </p>
            </div>
          </Link>
          {/* Box 5 */}
          <Link to="/urgent-medi" className="h-[35%] w-[28%]">
            <div className="bg-white border rounded-lg p-6 shadow-lg cursor-pointer hover:bg-primary hover:text-white transition duration-300 flex flex-col items-center group">
              <FaExclamationCircle className="text-4xl mb-4 text-primary transition duration-300 group-hover:text-white" />
              <h3 className="text-xl font-semibold text-center mb-2">Restock Needed</h3>
              <p className="text-sm text-center">
                Get alerts and view the list of medicines running low on stock.
              </p>
            </div>
          </Link>
          {/* Box 6 */}
          <Link to="/monthly-sale-data" className="h-[35%] w-[28%]">
            <div className="bg-white border rounded-lg p-6 shadow-lg cursor-pointer hover:bg-primary hover:text-white transition duration-300 flex flex-col items-center group">
              <FaChartLine className="text-4xl mb-4 text-primary transition duration-300 group-hover:text-white" />
              <h3 className="text-xl font-semibold text-center mb-2">Sale Analysis</h3>
              <p className="text-sm text-center">
                Access detailed sales and stock reports for better decision-making.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Dashboard
