const express =require('express')
const router = express.Router()
const userController = require('../controller/userController')
const auth = require ('../middleware/auth')

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/users/list',auth,userController.userList)
router.get('/users/:id',userController.oneUser)
router.delete('/users/delete/:id',userController.deleteUser)
router.put('/users/update/:id',userController.updateUser)



module.exports  = router;