import UserModel from '../models/User.js'
export default async (req, res, next) => {
    try {
        const user = await UserModel.findById({_id: req.userId})
        const {admin: isAdmin} = user._doc
        if(isAdmin){
            next()
        }else{
            return res.status(403).json('Отказано в доступе к этому действию')
        }
    }catch (e) {
        console.log(e)
        return res.status(400).json('Нет доступа')
    }
}