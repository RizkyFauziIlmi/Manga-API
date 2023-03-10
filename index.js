import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import komikRoute from './routes/komikRoute.js'
import adminRoute from './routes/adminRoute.js'
import adminMiddleware from './middleware/admin.js'
import { apiLimiter } from './middleware/apiLimiter.js'

const app = express()
dotenv.config()
app.use(cors())


const PORT = process.env.PORT || 8001
const DB_CONNECTION = process.env.uriMongoDB

mongoose.set('strictQuery', false)
mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(apiLimiter)
app.use('/admin', adminMiddleware, adminRoute)
app.use(komikRoute)


const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Databese Connected...'))

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT} PORT`)
})