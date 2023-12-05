import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import cookieParser from 'cookie-parser'
import restRoutes from './routes/restRoutes.js'

const app = express();

const PORT = process.env.PORT

app.use(express.json())

app.use(cors(corsOptions))

app.use(cookieParser())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(222).send('TasteUCLA')
})
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/reviews', reviewRoutes)
app.use('/search', searchRoutes)
app.use('/locations', restRoutes)

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log('Server connected to database')
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

   