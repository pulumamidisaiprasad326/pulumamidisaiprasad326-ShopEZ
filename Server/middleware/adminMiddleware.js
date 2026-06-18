export const verifyAdmin = (req, res, next) => {
  try {

    if (req.user.usertype !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin Access Only"
      });
    }

    next();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};