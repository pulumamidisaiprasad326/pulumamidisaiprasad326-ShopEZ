import Address from "../models/addressModel.js";

// ================= ADD ADDRESS =================

export const addAddress = async (req, res) => {
  try {

    console.log("REQ USER:", req.user);

    const {
      fullName,
      mobile,
      address,
      city,
      state,
      pincode
    } = req.body;

    const newAddress = await Address.create({
      userId: req.user.id,
      fullName,
      mobile,
      address,
      city,
      state,
      pincode
    });

    res.status(201).json({
      success: true,
      message: "Address Added Successfully",
      address: newAddress
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ================= GET USER ADDRESSES =================

export const getAddresses = async (req, res) => {
  try {

    const addresses = await Address.find({
      userId: req.user.id
    });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};