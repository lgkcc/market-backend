import UserModel from "../models/User.js";

export default async (req, res, next) => {
    try {
        const checkEmail = await UserModel.findOne({email: req.body.email})
        if(checkEmail){
            return res.status(400).json('Данная электронная почта уже используется')
        }
        next()
    }catch (e) {
        return res.status(500).json('Ошибка')
    }
}