import jwt from 'jsonwebtoken';
import config from 'config';

const jwt_SECRET = config.get('jwtSecret');

export const authMiddleware = (req, res, next) => {

    const token = req.header("Authorization")?.splite(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token authentication"})
    }
    try {
        const decoded = jwt.verify(token,jwt_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "invalid token"})
    }
}
