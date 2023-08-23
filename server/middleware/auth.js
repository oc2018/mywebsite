import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.headers.Authorization.split(" ")[1];
        // console.log(token);
        if(!token) return res.status(401).send(`You do not have permission to access this resource.`);
        let decodedData = jwt.verify(token, secret);

        req.userId = decodedData.userId
        // console.log(decodedData);
        next();
    } catch (error) {
        res.status(401).send(`Your token is invalid`);
    }
}

export default auth;