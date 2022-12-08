const jwt = require("jsonwebtoken")
// verify user token
const verifyToken=(req,res,next)=>{
 let token = req.headers['authorization'];
 console.log(token);
 console.log(req.headers)

       token = token.split(' ')[1];
 if(!token) return res.status(401).json({msg:"unauthorize user"})
 try {
   const decode = jwt.verify(token,process.env.SECRET_KEY) ;
   next();
 } catch (error) {
   res.status(400).json({msg:"token is not valid"})  
 }
}

module.exports = verifyToken;