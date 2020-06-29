var express = require('express');
const router = express.Router();
const licenselicense = require('../src/controller/licensecontroller');
const login =require('../src/controller/LoginController')
const adjustspeed =require('../src/controller/adjustspeedController')

router.post('/adjustspeed',adjustspeed.adjustspeed)
router.post('/uploadadjustspeed',adjustspeed.uploadadjustspeed)
router.post('/login',login.loginUser)
router.post('/updatelicense',verifyToken,licenselicense.updatelicense)
router.get('/license',licenselicense.license)
router.get('/menu',login.menuauth)
router.post('/generatelicense',getlicense)

function getlicense(req,res){
    const token = jwt.sign( req.body.token, 'HS512');
    let data ={
        "code":'200',
        "token":token
    }
    res.json(data)
    res.end()
}

var jwt = require('jsonwebtoken');
 function verifyToken ( req,res,next){
 jwt.verify(req.body.token,'HS512',(err,authData)=>{
     if(err) {
         return res.status(401).send({
            errormessage:err
         })
     }
 })
 next()
    }

module.exports = router;
