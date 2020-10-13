import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
require("dotenv").config()
import userRoutes from './routes/usersRoutes'
import BlogRoutes from './routes/blog'
import ContactRoutes from './routes/contacts'
import profileRoutes from './routes/profile'
import swaggerDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
const swaggerDocument = require('../swagger.json');





// 
mongoose.set('useCreateIndex', true)
const dbConn = mongoose.connect(`mongodb+srv://root:${process.env.PSWD}@mybrand.rqcqj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(morgan('dev'))
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/contact', ContactRoutes)
app.use('/',(req,res)=>{
res.status(200).json({message:'heroku pipelines passing!'});
})
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