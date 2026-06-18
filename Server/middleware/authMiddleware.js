import jwt from "jsonwebtoken";

// ================= VERIFY TOKEN =================

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded Token:", decoded);

    req.user = {
      id:
        decoded.id ||
        decoded._id ||
        decoded.userId,
      username: decoded.username,
      email: decoded.email,
      usertype: decoded.usertype
    };

    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
};

// ================= VERIFY ADMIN =================

export const verifyAdmin = (req, res, next) => {
  try {
    if (
      !req.user ||
      req.user.usertype !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin Access Only"
      });
    }

    next();

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};