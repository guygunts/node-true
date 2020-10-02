var express = require('express');
const router = express.Router();
const licenselicense = require('../src/controller/licensecontroller');
const login =require('../src/controller/LoginController')
const adjustspeed =require('../src/controller/adjustspeedController')
const blacklist =require('../src/controller/blacklistController')
const planoffer =require('../src/controller/planofferController')
const user =require('../src/controller/userController')
const maxrate=require('../src/controller/maxrateController')
const errorcode=require('../src/controller/errorcodeController')
const notifymapping=require('../src/controller/notifymappingController')
const servicetypemapping=require('../src/controller/servicetypemappingController')
const priceplan=require('../src/controller/priceplanController')
const mainpackage=require('../src/controller/packageController')
router.post('/google/adjustspeed',adjustspeed.adjustspeed)
router.post('/google/uploadadjustspeed',adjustspeed.uploadadjustspeed)
router.post('/google/login',login.loginUser)
router.post('/google/auth',login.authuser)

router.post('/google/updatelicense',verifyToken,licenselicense.updatelicense)
router.get('/google/license',licenselicense.license)
router.get('/google/menu',login.menuauth)
router.post('/google/generatelicense',getlicense)
router.post('/google/updatestastus',licenselicense.updatestastus)
router.post('/google/blacklist',blacklist.BlacklistController)
router.post('/google/blacklistadd',blacklist.BlacklistaddController)
router.post('/google/blacklistdelete',blacklist.BlacklistdeleteController)
router.post('/google/Blacklistlist',blacklist.BlacklistlistController)
router.post('/google/Blacklistfile',blacklist.BlacklistfileController)
router.post('/google/Blacklistfiledelete',blacklist.BlacklistlistdeleteController)
router.post('/google/Blacklistdownload',blacklist.BlacklistdownloadController)


router.post('/google/planofferdropdown',planoffer.offerdropdown)
router.get('/google/planofferlist',planoffer.Offerlist)
router.post('/google/planofferinsert',planoffer.offerinsert)
router.post('/google/planofferdelete',planoffer.offerdelete)
router.post('/google/planofferedit',planoffer.offeredit)
router.post('/google/offerinsertfile',planoffer.offerinsertfile)


router.get('/google/getuser',user.getdatauser)
router.get('/google/userlist',user.Userlist)
router.post('/google/useredit',user.Useredit)
router.post('/google/userinsert',user.Userinsert)
router.post('/google/userdelete',user.Userdelete)

router.get('/google/getmaxrate',maxrate.getdataMaxrate)
router.get('/google/maxratelist',maxrate.Maxratelist)
router.post('/google/maxrateedit',maxrate.Maxrateedit)
router.post('/google/maxrateinsert',maxrate.Maxrateinsert)
router.post('/google/maxratedelete',maxrate.Maxratedelete)
 
router.get('/google/geterrorcode',errorcode.getdataErrorcode)
router.get('/google/errorcodelist',errorcode.Errorcodelist)
router.post('/google/errorcodeedit',errorcode.Errorcodeedit)
router.post('/google/errorcodeinsert',errorcode.Errorcodeinsert)
router.post('/google/errorcodedelete',errorcode.Errorcodedelete)

router.get('/google/getnotifymapping',notifymapping.getdataNotifymapping)
router.get('/google/notifymappinglist',notifymapping.Notifymappinglist)
router.post('/google/notifymappingedit',notifymapping.Notifymappingedit)
router.post('/google/notifymappinginsert',notifymapping.Notifymappinginsert)
router.post('/google/notifymappingdelete',notifymapping.Notifymappingdelete)

router.get('/google/getservicetype',servicetypemapping.getdataservicetype)
router.get('/google/servicelist',servicetypemapping.servicetypelist)
router.post('/google/serviceedit',servicetypemapping.servicetypeedit)
// router.post('/google/servicedelete',servicetypemapping.servicetypedelete)

router.get('/google/getpriceplan',priceplan.getdatapriceplan)
router.get('/google/priceplanlist',priceplan.priceplanlist)
router.post('/google/priceplanedit',priceplan.priceplanedit)
 //router.post('/google/priceplandelete',priceplan.priceplandelete)

 router.get('/google/getpackage',mainpackage.getdataMainPackage)
router.get('/google/packagelist',mainpackage.MainPackagelist)
router.post('/google/packagedit',mainpackage.MainPackageedit)
//  router.post('/google/packagedelete',mainpackage.MainPackagedelete)

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
