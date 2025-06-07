import mongoose from "mongoose";

const medicineSaleSchema = new mongoose.Schema({
  billId: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientPhone: {
    type: String,
    required: true
  },
  totalAmount: {
    type: String,
    required: true
  },
  medicines: [
    {
      medicineName: {
        type: String,
        required: true
      },
      batchNumber: {
        type: String,
        required: true
      },
      quantityPurchased: {
        type: Number,
        required: true,
        min: [1, 'Must purchase at least one unit']
      },
      expiryDate: {
        type: Date,
        required: true
      },
      pricePerUnit: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  } 
});

const medicineSaleModel = mongoose.model('MedicineSale',medicineSaleSchema);

export default medicineSaleModel;
