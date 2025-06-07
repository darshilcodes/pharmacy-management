import jwt from 'jsonwebtoken';
import phModel from '../models/pharmacistModel.js'; // add `.js` if using ES modules

const Authenticate = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const pharmacist = await phModel.findOne({ email: decoded.email });

    if (!pharmacist) {
      return res.status(401).json({ success: false, message: "Pharmacist not found." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
};

export default Authenticate;
