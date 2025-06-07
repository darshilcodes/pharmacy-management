import mongoose from 'mongoose'

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  batchNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative']
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Other'],
    default: 'Other'
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Automatically update 'updatedAt' on save
medicineSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const medicineModel = mongoose.model('Medicine', medicineSchema);

export default medicineModel;