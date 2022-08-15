import express from 'express'
import cors from "cors";
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json('Server is worked'))

app.listen(4444, err => {
    err ? console.log(err) : console.log('server start')
})
