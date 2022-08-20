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
app.post('/products', addProduct)
app.delete('/products/:id', removeProduct)
app.patch('/products/:id', updateProduct)

//Categories
app.get('/category', getCategories)
app.post('/category', addCategories)
app.delete('/category/:id', removeCategories)

//Users

app.listen(4444, err => {
    err ? console.log(err) : console.log('server start')
})
