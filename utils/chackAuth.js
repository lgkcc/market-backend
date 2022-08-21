import jwt from "jsonwebtoken";

export default (req, res, next) => {
    try {
        const {_id} = jwt.verify(req.headers.authorization.split(' ')[1], 'secretKey')
        req.userId = _id
        next()
    }catch (e) {
        return res.status(400).json('Нет доступа')
    }
}