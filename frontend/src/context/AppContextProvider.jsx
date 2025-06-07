import { useState, useEffect } from "react";
import AppContext from "./AppContext.js";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [email,setEmail] = useState("");

  const getMedi = async () => {
    try {
      const response = await axios.get(`${backendUrl}/medicine/get-medicines`, {
        headers: {
          token
        }
      });
      setMedicines(response.data.medicines); 

    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    }
  };
  
useEffect(() => {
  console.log("Medicines updated:", medicines);
}, [medicines]);
  // 🔁 Run when token changes
  useEffect(() => {
    if (token) {
      getMedi();
    } else {
      setEmail("")
      setMedicines([]); // clear medicines if logged out
    }
  }, [token,email]);

  return (
    <AppContext.Provider value={{ token, setToken, medicines, getMedi ,setEmail ,email}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
