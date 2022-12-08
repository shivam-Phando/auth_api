const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
port = 4000
require('./db/dbconnect');
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// import routes
const userRoutes = require("./routes/user")
const postRoutes = require('./routes/posts')
//use routes
app.use('/api', userRoutes)
app.use('/api',postRoutes)


//create server
app.listen(port,()=>{
    console.log(`server is running on port${port}`)
})