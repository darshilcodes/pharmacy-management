import mongoose from "mongoose";

const phSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // ensures no duplicate emails
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const phModel = mongoose.model('Pharmacist',phSchema);

export default phModel;
