var express = require('express');
const router = express.Router();
const licenselicense = require('../src/controller/licensecontroller');
const login =require('../src/controller/LoginController')
const adjustspeed =require('../src/controller/adjustspeedController')
const blacklist =require('../src/controller/blacklistController')
const planoffer =require('../src/controller/planofferController')
const user =require('../src/controller/userController')
const maxrate=require('../src/controller/maxrateController')
router.post('/adjustspeed',adjustspeed.adjustspeed)
router.post('/uploadadjustspeed',adjustspeed.uploadadjustspeed)
router.post('/login',login.loginUser)
router.post('/auth',login.authuser)

router.post('/updatelicense',verifyToken,licenselicense.updatelicense)
router.get('/license',licenselicense.license)
router.get('/menu',login.menuauth)
router.post('/generatelicense',getlicense)
router.post('/updatestastus',licenselicense.updatestastus)
router.post('/blacklist',blacklist.BlacklistController)
router.post('/blacklistadd',blacklist.BlacklistaddController)
router.post('/blacklistdelete',blacklist.BlacklistdeleteController)
router.post('/Blacklistlist',blacklist.BlacklistlistController)
router.post('/Blacklistfile',blacklist.BlacklistfileController)
router.post('/Blacklistfiledelete',blacklist.BlacklistlistdeleteController)
router.post('/Blacklistdownload',blacklist.BlacklistdownloadController)



router.get('/planofferlist',planoffer.Offerlist)
router.post('/planofferinsert',planoffer.offerinsert)
router.post('/planofferdelete',planoffer.offerdelete)
router.post('/planofferedit',planoffer.offeredit)
router.post('/offerinsertfile',planoffer.offerinsertfile)

router.get('/getuser',user.getdatauser)
router.get('/userlist',user.Userlist)
router.post('/useredit',user.Useredit)
router.post('/userinsert',user.Userinsert)
router.post('/userdelete',user.Userdelete)

router.get('/getmaxrate',maxrate.getdataMaxrate)
router.get('/maxratelist',maxrate.Maxratelist)
router.post('/maxrateedit',maxrate.Maxrateedit)
router.post('/maxrateinsert',maxrate.Maxrateinsert)
router.post('/maxratedelete',maxrate.Maxratedelete)

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
