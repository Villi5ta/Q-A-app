import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.body.userId = decoded.user_id;
    req.body.userName = decoded.user_name;

    return next();
  });
};

export default authUser;
