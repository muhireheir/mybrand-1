import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import BlogRoutes from './routes/blog'
import env from "dotenv"
env.config()
const dbConn = mongoose.connect(`mongodb+srv://root:${process.env.PSWD}@mybrand.rqcqj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/blogs', BlogRoutes)
app.use('/', (req, res) => {
    res.json({ message: "it's working" })
})
app.use((req, res, next) => {
    let error = new Error('Route Not  found.')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server  running on port ${process.env.PORT}`)
})