import jwt from "jsonwebtoken"

const secretKey = process.env.PRIVATE_KEY || "aace3q1313";
const generateToken = (id) => {
    return jwt.sign({id}, secretKey, {expiresIn: "3d"})
}

export default generateToken;