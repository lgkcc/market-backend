import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import {connect} from "./config.js";
import {checkAdmin, checkAuth, checkEmail} from "./utils/index.js";
import {UserController, CategoryController, ProductController} from "./controllers/index.js";
mongoose.connect(connect)
    .then(() => {
        console.log('db connect')
    }).catch((err) => console.log('db error', err))

const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => res.json('Server is worked'))

//Products
app.get('/products', ProductController.getAllPr0duct)
app.get('/products/:id', ProductController.getOneProduct)
app.post('/products', checkAuth, checkAdmin, ProductController.addProduct)
app.delete('/products/:id', checkAuth, checkAdmin, ProductController.removeProduct)
app.patch('/products/:id', checkAuth, checkAdmin, ProductController.updateProduct)

//Categories
app.get('/category', CategoryController.getCategories)
app.post('/category', checkAuth, checkAdmin, CategoryController.addCategories)
app.delete('/category/:id', checkAuth, checkAdmin, CategoryController.removeCategories)

//Users
app.get('/user', checkAuth, checkAdmin, UserController.getAllUser)
app.get('/user/me', checkAuth, UserController.checkUserByToken)
app.get('/user/:id', checkAuth, checkAdmin, UserController.getOneUserById)
app.post('/user/login', UserController.login)
app.post('/user/register', checkEmail, UserController.register)
// app.patch('/user/:id')



app.listen(4444, err => {
    err ? console.log(err) : console.log('server start')
})
