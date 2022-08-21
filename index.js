import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import {connect} from "./config.js";
import {
    addProduct,
    getAllPr0duct,
    getOneProduct,
    removeProduct,
    updateProduct
} from "./controllers/ProductController.js";
import {addCategories, getCategories, removeCategories} from "./controllers/CategoryController.js";
import {
    checkUserByToken,
    getAllUser,
    getOneUserById,
    login,
    register
} from "./controllers/UserController.js";
import checkAuth from './utils/chackAuth.js'
import checkEmail from "./utils/checkEmail.js";
import checkAdmin from "./utils/checkAdmin.js";
mongoose.connect(connect)
    .then(() => {
        console.log('db connect')
    }).catch((err) => console.log('db error', err))

const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => res.json('Server is worked'))

//Products
app.get('/products', getAllPr0duct)
app.get('/products/:id', getOneProduct)
app.post('/products', checkAuth, checkAdmin, addProduct)
app.delete('/products/:id', checkAuth, checkAdmin, removeProduct)
app.patch('/products/:id', checkAuth, checkAdmin, updateProduct)

//Categories
app.get('/category', getCategories)
app.post('/category', checkAuth, checkAdmin, addCategories)
app.delete('/category/:id', checkAuth, checkAdmin, removeCategories)

//Users
app.get('/user', checkAuth, checkAdmin, getAllUser)
app.get('/user/me', checkAuth, checkUserByToken)
app.get('/user/:id', checkAuth, checkAdmin, getOneUserById)
app.post('/user/login', login)
app.post('/user/register', checkEmail, register)
// app.patch('/user/:id')



app.listen(4444, err => {
    err ? console.log(err) : console.log('server start')
})
