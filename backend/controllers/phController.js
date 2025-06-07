import phModel from "../models/pharmacistModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import medicineModel from "../models/modecineModel.js";

const phLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success:false, message: "Email and password required" });
        }

        const pharmacist = await phModel.findOne({ email });

        if (!pharmacist) {
            return res.status(404).json({ success: false, message: "Pharmacist not found" });
        }
        const token = jwt.sign({email, name : pharmacist.name},process.env.JWT_SECRET,{ expiresIn: "24h" });
        
        const isPasswordMatch = await bcrypt.compare(password, pharmacist.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid Password...!" });
        }

        res.status(200).json({ token, success: true, message: "Login successful"  });

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
};

const changePassword1 = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const pharmacist = await phModel.findOne({ email });

        if (!pharmacist) {
            return res.status(404).json({ success: false, message: "Email not found" });
        }

        // Generate token (expires in 10 minutes)
        const generatedToken = jwt.sign(
            { email, name: pharmacist.name },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Token',
        html: `
            <p>Hello ${pharmacist.name},</p>
            <p>You requested to reset your password. Use the following token:</p>
            <div style="padding: 10px; background-color: #f2f2f2; border: 1px solid #ccc; display: inline-block; font-family: monospace; font-size: 16px;">
                ${generatedToken}
            </div>
            <p><small>Select and copy the token manually.</small></p>
            <p>This token is valid for 10 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            token: generatedToken,
            message: `Token sent successfully to ${email}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}; 
const changePassword2 = async (req, res) => {
    try {
        const { resetToken, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password and confirm Password do not match" });
        }

        const decoded = jwt.verify(resetToken,process.env.JWT_SECRET);

        if (!decoded || !decoded.email) {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }
        const email = decoded.email;

        const pharmacist = await phModel.findOne({ email });
        if (!pharmacist) {
            return res.status(404).json({ success: false, message: "Pharmacist not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        pharmacist.password = hashedPassword;
        await pharmacist.save();

        res.json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

 
const changePassword3 = async (req, res) => {
  try {
    const { email, password, newPassword, conformnewPassword } = req.body;

    if (!email || !password || !newPassword || !conformnewPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (newPassword !== conformnewPassword) {
      return res.status(400).json({ success: false, message: "New passwords do not match" });
    }

    const pharmacist = await phModel.findOne({ email });
    if (!pharmacist) {
      return res.status(404).json({ success: false, message: "Pharmacist not found" });
    }

    const isMatch = await bcrypt.compare(password, pharmacist.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    pharmacist.password = hashedNewPassword;

    await pharmacist.save();

    res.json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const pharmacist = await phModel.findOne({ email });

    if (!pharmacist) {
      return res.status(404).json({ success: false, message: "Pharmacist not found" });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    pharmacist.password = hashedPassword;
    await pharmacist.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export {phLogin, changePassword1, changePassword2, changePassword3, changePassword }; 
// const addPh = async () => {
//     try {
//         const hashedPassword = await bcrypt.hash('Pharmacist@123', 10); // 10 = salt rounds
//         const data = {
//             email: 'radadiyadarshil9@gmail.com',
//             password: hashedPassword,
//             name : 'Mr. Pharmacist'
//         };

//         const newPharmacist = new phModel(data);
//         await newPharmacist.save();

//         console.log('Pharmacist added');
//     } catch (error) {
//         console.error(error);
//     }
// };
