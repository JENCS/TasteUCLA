import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import reviewRoute from './routes/reviewRoute.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'

const app = express();

const PORT = process.env.PORT

app.use(express.json())

app.use(cors(corsOptions))

app.use('/users', userRoute)
app.use('/reviews', reviewRoute)

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

app.get('/', (req, res) => {
    console.log(req)
    return res.status(222).send('TasteUCLA')
})
