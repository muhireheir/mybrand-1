import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
require("dotenv").config()
import userRoutes from './routes/usersRoutes'
import BlogRoutes from './routes/blog'
import ContactRoutes from './routes/contacts'
import profileRoutes from './routes/profile'
import swaggerDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = require('../swagger.json');





// 
mongoose.set('useCreateIndex', true)
const dbConn = mongoose.connect(`mongodb+srv://root:${process.env.PSWD}@mybrand.rqcqj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/contact', ContactRoutes)
app.use('/profile', profileRoutes)
app.use('/users', userRoutes)
app.use('/blogs', BlogRoutes)
app.use((req, res, next) => {
    let error = new Error('Route Not  found.')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
    
})

app.listen(process.env.PORT, () => {
    console.log(`server  running on port ${process.env.PORT}`)
})


module.exports=app