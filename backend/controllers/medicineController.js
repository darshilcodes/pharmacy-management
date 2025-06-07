import medicineModel from "../models/modecineModel.js";

const addMedicine = async (req, res) => {
  try {
    const { name, batchNumber, manufacturer, expiryDate, quantity, pricePerUnit, category } = req.body;
    if (
      !name || !batchNumber || !manufacturer || !expiryDate || !quantity || !pricePerUnit || !category
    ) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const existingMedicine = await medicineModel.findOne({ batchNumber, manufacturer });

    if (existingMedicine) {
      return res.status(400).json({ success: false, message: "This medicine batch already exists from the same manufacturer." });
    }
    else {
      // Add new medicine
      const newMedicine = new medicineModel({
        name,
        batchNumber,
        manufacturer,
        expiryDate,
        quantity,
        pricePerUnit,
        category
      });

      await newMedicine.save();

      return res.status(201).json({ success: true, message: "New medicine added successfully.", data: newMedicine });
    }

  } catch (error) {
    console.error("Error adding medicine:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const { updates } = req.body;
    // updates = [{ _id: "abc123", quantity: 2 }, { _id: "def456", quantity: 5 }]

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid input: provide array of {_id, quantity}." });
    }

    for (const update of updates) {
      const { _id, quantity } = update;

      const medicine = await medicineModel.findById(_id);

      if (!medicine) {
        return res.status(404).json({ success: false, message: `Medicine with ID ${_id} not found.` });
      }

      if (medicine.quantity < quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for medicine ID ${_id}.` });
      }

      medicine.quantity -= quantity;
      await medicine.save();
    }

    res.status(200).json({ success: true, message: "Quantities updated successfully." });

  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.find();
    res.json({ success: true, medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const updateStock = async (req, res) => {
  try {
    const billItems = req.body.items;

    for (const item of billItems) {
      const medicine = await medicineModel.findById(item._id)
      medicine.quantity -= item.selectedQty

      await medicine.save()
    }

    return res.json({ success: true, message: "Stock updated successfully" });

  } catch (error) {
    console.error("Error updating stock:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const reqData = req.body;
    const newData = reqData.formData;
    const med = await medicineModel.findById(reqData.selectedMedicineOption.value);
    
    if (!med) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }

    med.name = newData.name;
    med.batchNumber = newData.batchNumber;
    med.manufacturer = newData.manufacturer;
    med.expiryDate = newData.expiryDate;
    med.quantity = newData.quantity;
    med.pricePerUnit = newData.pricePerUnit;
    med.category = newData.category;

    await med.save();  

    res.status(200).json({ success: true, message: "Medicine data updated successfully." });

  } catch (error) {
    console.error("Error updating medicine details:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export { addMedicine, decreaseQuantity, getMedicines, updateStock, updateMedicine }