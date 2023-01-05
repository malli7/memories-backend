import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    let decodedData = jwt.verify(token, "test");
    req.userId = decodedData?.id;
  }
  next();
};

export default auth;