import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../context/AppContext.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddMedicine = () => {
  const {getMedi, token} = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: "",
    batchNumber: "",
    manufacturer: "",
    expiryDate: "",
    quantity: "",
    pricePerUnit: "",
    category: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/medicine/add-medicine`,
        formData,
        {
          headers: { token: token },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Medicine added successfully!");
        setFormData({
          name: "",
          batchNumber: "",
          manufacturer: "",
          expiryDate: "",
          quantity: "",
          pricePerUnit: "",
          category: "",
        });
        getMedi()
      } else {
        toast.error("Failed to add medicine. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <div className="w-1/2 m-4   p-8 bg-white shadow-xl rounded-lg border border-gray-200">
 
      <h2 className="text-3xl  text-center text-gray-800 mb-8 tracking-tight">
        Add New Medicine
      </h2>

      <form  className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {["name", "batchNumber", "manufacturer", "expiryDate", "quantity", "pricePerUnit", "category"].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="block text-gray-700 text-sm font-medium mb-2">
              {field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
              :
            </label>
            {field === "category" ? (
              <select
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className={`
                  block w-full px-4 py-2 border rounded-md text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                  transition duration-200 ease-in-out
                  ${formData[field] === "" ? "bg-white border-gray-300" : ""}
                `}
              >
                <option value="">Select Category</option>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <input
                id={field}
                name={field}
                type={
                  field === "expiryDate"
                    ? "date"
                    : field === "quantity" || field === "pricePerUnit"
                    ? "number"
                    : "text"
                }
                placeholder={`Enter ${field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())}`}
                value={formData[field]}
                onChange={handleChange}
                required
                className={`
                  block w-full px-4 py-2 border rounded-md text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                  transition duration-200 ease-in-out
                  bg-white border-gray-300
                `}
              />
            )}
          </div>
        ))}


      </form>
        <div className="   pt-8">
          
          <button
          onClick={handleSubmit}
            type="submit"
            className='w-full py-2 px-6 rounded-lg  bg-primary hover:bg-indigo-700  text-white shadow-lg transition duration-100 '
          >
            Add Medicine
          </button>
        </div>
    </div>
  );
};

export default AddMedicine;
