import UserModel from '../models/User.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash
        })

        const user = await doc.save()

        const token = jwt.sign({
                _id: user._id
            },
            'secretKey', {expiresIn: '30d'})

        const {passwordHash: p, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if(!user) {
            return res.status(400).json('Неверное имя пользователя или пароль')
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPass){
            return res.status(400).json('Неверное имя пользователя или пароль')
        }

        const token = jwt.sign({
                _id: user._id
            },
            'secretKey', {expiresIn: '30d'})

        const {passwordHash: p, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })
    }catch (e) {
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        })
    }
}
export const checkUserByToken = async (req, res) => {
    try {
        const user = await UserModel.findById({_id: req.userId})
        if(!user){
            return res.status(404).json({message: 'Данный пользователь был удален или его никогда не существовало'})
        }
        const { passwordHash, ...userData } = user._doc
        res.json({
            ...userData
        })
    }catch(err) {

    }
}
export const getAllUser = async (_, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch (e) {
        return res.status(500).json({message: 'Не удалось получить список пользователей'})
    }
}
export const getOneUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.json(user)
    } catch (e) {
        return res.status(500).json({message: 'Не удалось получить данные о пользователе'})
    }
}