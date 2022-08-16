import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import {connect} from "./config.js";
mongoose.connect(connect)
    .then(() => {
        console.log('db connect')
    }).catch((err) => console.log('db error', err))

const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => res.json('Server is worked'))
app.get('/category', (req, res) => res.json('Server is worked'))
app.get('/products', (req, res) => res.json('Server is worked'))
app.get('/products/:id', (req, res) => res.json('Server is worked'))

app.listen(4444, err => {
    err ? console.log(err) : console.log('server start')
})
