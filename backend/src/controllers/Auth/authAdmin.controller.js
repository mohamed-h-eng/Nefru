const adminSchema = require("../validation/authAdminValidation");
//require jwt
const jwt = require("jsonwebtoken");
// require admin model
const Admin = require("../../models/admin.model");
// create function
const loginAdmin = async (req, res) => {
  try {
    // validate by joi
    const { error, value } = adminSchema.loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    // show Error Message
    if (error) {
      return res
        .status(400)
        .json({ msg: error.details.map((err) => err.message).join(", ") });
    }
    // get Data from Value
    const { email, password } = value;
    // check admin account in database
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    // compare password
    const matchedPassword = await admin.comparePassword(password);
    if (!matchedPassword) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }
    // create token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // response
    res.status(200).json({ msg: "Login Successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// Export Module
module.exports = {
  loginAdmin,
};
