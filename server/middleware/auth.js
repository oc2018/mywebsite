import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
    const secret = process.env.SECRET;
    // console.log("testing secret", secret);
    try {
        const token = req.headers.authorization.split(" ")[1] || req.headers.Authorization.split(" ")[1];
        console.log({"Token:": token}, {"Secret:": secret});
        if(!token) return res.status(401).send(`You do not have permission to access this resource.`);
        let decodedData = jwt.verify(token, secret);

        req.userId = decodedData.userId
        console.log(decodedData.userId);
        next();
    } catch (error) {
        res.status(401).send(`Your token is invalid`);
    }
}

export default auth;