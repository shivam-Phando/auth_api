const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((res)=>{
    console.log("mongodb is connected")
})
.catch((error)=>{
    console.log(error)
})