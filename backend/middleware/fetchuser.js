var jwt = require("jsonwebtoken");
const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm";

const fetchuser = (req, res, next) => {
    //Get the user fron=m the JWT token and add Id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using a valid token" })
    }
}

module.exports = fetchuser;