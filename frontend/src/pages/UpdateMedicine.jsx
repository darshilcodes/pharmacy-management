import { useContext, useState } from "react";
import AppContext from "../context/appContext";
import Select from "react-select";
import axios from 'axios'
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UpdateMedicine = () => {
    const { medicines ,token} = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: "",
        batchNumber: "",
        manufacturer: "",
        expiryDate: "",
        quantity: "",
        pricePerUnit: "",
        category: "",
    });
 
    const [isSelected, setIsSelected] = useState(false);
    const [selectedMedicineOption, setSelectedMedicineOption] = useState(null);

    const options = medicines.map((med) => ({
        value: med._id,
        label: `${med.name} (${med.batchNumber}, ${med.manufacturer})`,
    }));

    const handleSelectMedicine = (selectedOption) => {
        setSelectedMedicineOption(selectedOption);
        if (selectedOption) {
            const selected = medicines.find((m) => m._id === selectedOption.value);
            if (selected) {
                setFormData({
                    name: selected.name,
                    batchNumber: selected.batchNumber,
                    manufacturer: selected.manufacturer,
                    expiryDate: selected.expiryDate.split("T")[0],
                    quantity: selected.quantity,
                    pricePerUnit: selected.pricePerUnit,
                    category: selected.category,
                });
                setIsSelected(true);
            }
        } else {
            setFormData({
                name: "",
                batchNumber: "",
                manufacturer: "",
                expiryDate: "",
                quantity: "",
                pricePerUnit: "",
                category: "",
            });
            setIsSelected(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSelected) {
            alert("Please select a medicine to update.");
            return;
        }
        updateMedicine();
        setSelectedMedicineOption(null);
  setFormData({
    name: "",
    batchNumber: "",
    manufacturer: "",
    expiryDate: "",
    quantity: "",
    pricePerUnit: "",
    category: "",
  });
  setIsSelected(false);
getMedi()
    };

const updateMedicine = async () => {
  try {
    const response = await axios.post(
      `${backendUrl}/medicine/update-medicine`,
      {
        selectedMedicineOption,
        formData
      },
      {
        headers: {
          token: token
        }
      }
    );

    console.log(response);
    toast.success(response.data.message);
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Failed to update medicine"
    );
  }
};



    return (
        <div className="w-1/2  m-4 p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h2 className="text-3xl   text-center text-gray-800 mb-8 tracking-tight">
                Update Medicine Details
            </h2>

            {/* Select Medicine */}
            <div className="mb-8">
                <label htmlFor="medicine-search" className="block text-gray-700 text-sm font-semibold mb-2">
                    Find Medicine:
                </label>
                <Select
                    id="medicine-search"
                    options={options}
                    onChange={handleSelectMedicine}
                    value={selectedMedicineOption}
                    placeholder="Search and select a medicine..."
                    isClearable
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            padding: "6px",
                            fontSize: "16px",
                            borderRadius: "0.5rem",
                            borderColor: state.isFocused ? "#000" : "#d1d5db",
                            boxShadow: state.isFocused ? "0 0 0 2px rgba(0,0,0,0.2)" : "none",
                            "&:hover": { borderColor: "#6b7280" },
                            transition: "all 0.2s ease-in-out",
                        }),
                        placeholder: (base) => ({ ...base, color: "#6b7280" }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? "#f3f4f6" : "white",
                            color: "#1f2937",
                            padding: "12px 20px",
                            "&:active": { backgroundColor: "#d1d5db" },
                        }),
                        singleValue: (base) => ({ ...base, color: "#1f2937" }),
                        menu: (base) => ({
                            ...base,
                            borderRadius: "0.5rem",
                            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                            border: "1px solid #e5e7eb",
                        }),
                    }}
                />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
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
                                onChange={handleChange}
                                value={formData[field]}
                                disabled={!isSelected}
                                className={`block w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black ${!isSelected ? "bg-gray-100 cursor-not-allowed border-gray-200" : "bg-white border-gray-300"
                                    }`}
                                required
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
                                type={
                                    field === "expiryDate"
                                        ? "date"
                                        : field === "quantity" || field === "pricePerUnit"
                                            ? "number"
                                            : "text"
                                }
                                name={field}
                                placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}`}
                                onChange={handleChange}
                                value={formData[field]}
                                disabled={!isSelected}
                                className={`block w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black ${!isSelected ? "bg-gray-100 cursor-not-allowed border-gray-200" : "bg-white border-gray-300"
                                    }`}
                                required
                            />
                        )}
                    </div>
                ))}

                {/* Submit */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        disabled={!isSelected}
                        className={`w-full py-2 px-6 rounded-lg   text-white shadow-lg transition duration-100 ${isSelected
                                ? "bg-primary hover:bg-indigo-700"
                                : "bg-primary cursor-not-allowed"
                            }`}
                       >
                        Update Medicine
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMedicine;
