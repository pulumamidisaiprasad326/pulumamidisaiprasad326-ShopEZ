import Cart from "../models/cartModel.js";

// Add To Cart
export const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);

    await cartItem.save();

    res.status(201).json({
      success: true,
      message: "Item Added To Cart",
      cartItem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get User Cart
export const getUserCart = async (req, res) => {
  try {

    const cartItems = await Cart.find({
      userId: req.params.userId
    });

    res.status(200).json({
      success: true,
      count: cartItems.length,
      cartItems
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Cart Quantity
export const updateCartQuantity = async (req, res) => {
  try {

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found"
      });
    }

    cartItem.quantity = req.body.quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Quantity Updated Successfully",
      cartItem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remove Cart Item
export const removeCartItem = async (req, res) => {
  try {

    const cartItem = await Cart.findByIdAndDelete(
      req.params.id
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart Item Removed Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  try {

    await Cart.deleteMany({
      userId: req.params.userId
    });

    res.status(200).json({
      success: true,
      message: "Cart Cleared Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};