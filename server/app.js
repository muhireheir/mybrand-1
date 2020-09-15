let express  =  require('express')
let app = express()
let logger = require('morgan')
let bodyParser=require('body-parser')
const publicRoutes=require('./api/routes/publicRoutes')
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/',publicRoutes)

app.use((req,res,next)=>{
    let error=  new Error('Route Not  found.')
    error.status(404)
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})



module.exports=app