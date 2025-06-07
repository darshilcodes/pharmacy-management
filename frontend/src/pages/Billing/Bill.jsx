import { useContext, useState, useEffect, useRef } from "react";
import AppContext from "../../context/appContext";
import AvailableMedicines from "./AvailableMedicines";
import BillSummary from "./BillSummary";
import axios from "axios";
import { toast } from "react-toastify";
import BillPdfData from "./BillPdfData";
import { useReactToPrint } from "react-to-print";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Bill = () => {
  const { medicines ,getMedi ,token} = useContext(AppContext);
  const [quantities, setQuantities] = useState({});
  const [billItems, setBillItems] = useState([]);
  const [stock, setStock] = useState({});
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [isGenerating, setisGenerating] = useState(false);

  useEffect(() => {
    const initialStock = {};
    medicines.forEach((med) => {
      initialStock[med._id] = med.quantity;
    });
    setStock(initialStock);
  }, [medicines]);

  const getBillNumber = () => {
    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0") +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0") +
      now.getSeconds().toString().padStart(2, "0");
    return timestamp;
  };

  const [billNumber] = useState(() => getBillNumber());

  const addSaleData = async () => {
    try {
      const response = await axios.post(`${backendUrl}/medicine/add-sale-data`, {
        patientName,
        patientPhone,
        billNumber,
        billItems,
        totalAmount
      },{headers: {token:token}});
     // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const billRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: billNumber,
    contentRef: billRef
  });

  const makeBill = async () => {
    setisGenerating(true);
    try {
      if (!patientName) {
        return toast.error("Patient's name is required!");
      }

      if (!patientPhone) {
        return toast.error("Patient's phone number is required!");
      }

      if (billItems.length === 0) {
        return toast.error("No medicine has been selected!");
      }

      const res = await axios.post(`${backendUrl}/medicine/update-stock`, {
        items: billItems,
      },{headers:{token : token}});
      handlePrint()
      await addSaleData();
      await getMedi(); // Refresh medicines

      toast.success(res.data.message);

      // Reset fields
      setPatientName("");
      setPatientPhone("");
      setQuantities({});
      setBillItems([]);
    } catch (error) {
      console.error("Error in makeBill:", error.response?.data || error);
      toast.error("Failed to make bill. Please try again.");
    } finally {
      setisGenerating(false);
    }
  };

const handleQuantityChange = (id, value) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: value,
  }));
};


  const handleAddToBill = (med) => {
    const today = new Date();
    const expiryDate = new Date(med.expiryDate);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (expiryDate < today) {
      toast.error("❌ This medicine is already expired!");
      setQuantities({...quantities,[med._id]:""})
      return;
    }

    if (diffDays <= 7) {
      const confirmAdd = window.confirm(
        `⚠️ This medicine will expire in ${diffDays} day(s). Do you still want to add it?`
      );
      if (!confirmAdd) return;
    }

    const qty = parseInt(quantities[med._id], 10);
    const availableQty = stock[med._id];

    if (!qty || qty <= 0) return alert("Enter valid quantity");
    if (qty > availableQty) return alert("Insufficient stock");

    const existing = billItems.find((item) => item._id === med._id);
    if (existing) {
      const newQty = existing.selectedQty + qty;
      if (newQty > availableQty) return alert("Total quantity exceeds stock");

      const updatedBillItems = billItems.map((item) =>
        item._id === med._id
          ? {
              ...item,
              selectedQty: newQty,
              total: parseFloat((newQty * item.pricePerUnit).toFixed(2)),
            }
          : item
      );
      setBillItems(updatedBillItems);
    } else {
      setBillItems([
        ...billItems,
        {
          ...med,
          selectedQty: qty,
          total: parseFloat((qty * med.pricePerUnit).toFixed(2)),
        },
      ]);
    }

    setStock((prev) => ({
      ...prev,
      [med._id]: prev[med._id] - qty,
    }));

    setQuantities((prev) => ({
      ...prev,
      [med._id]: "",
    }));
  };

  const handleRemoveItem = (id) => {
    const itemToRemove = billItems.find((item) => item._id === id);
    if (!itemToRemove) return;

    setStock((prev) => ({
      ...prev,
      [id]: prev[id] + itemToRemove.selectedQty,
    }));
    setBillItems(billItems.filter((item) => item._id !== id));
  };

  const totalAmount = billItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col mx-4 mt-4 w-[70%]">
      <BillSummary
        patientName={patientName}
        patientPhone={patientPhone}
        billItems={billItems}
        handleRemoveItem={handleRemoveItem}
        totalAmount={totalAmount}
        setPatientName={setPatientName}
        setPatientPhone={setPatientPhone}
        billNumber={billNumber}
        makeBill={makeBill}
        isGenerating={isGenerating}
      />
      <AvailableMedicines
        medicine={medicines}
        stock={stock}
        quantities={quantities}
        handleQuantityChange={handleQuantityChange}
        handleAddToBill={handleAddToBill}
      />
      <div className="hidden">
        <BillPdfData
        ref={billRef}
        billItems={billItems}
        totalAmount={totalAmount}
        patientName={patientName}
        patientPhone={patientPhone}
        billNumber={billNumber}
      />
    </div>
    
    </div>
  );
};

export default Bill;
