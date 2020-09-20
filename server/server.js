import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import userRoutes from './routes/usersRoutes'
import BlogRoutes from './routes/blog'
import ContactRoutes from './routes/contacts'
import profileRoutes from './routes/profile'
const dbConn = mongoose.connect(`mongodb+srv://root:${process.env.PSWD}@mybrand.rqcqj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user',userRoutes)
app.use('/blogs',BlogRoutes)
app.use('/contact',ContactRoutes)
app.use('/profile',profileRoutes)
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