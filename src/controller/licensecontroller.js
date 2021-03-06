const licenseService = require('../service/licenseService');
var jwt = require('jsonwebtoken');
class licenseController {
    async license(req, res) {
        let ret = await licenseService.license();
       await jwt.verify(ret.license, 'HS512', (err, authData) => {
            if (err) {
                //ret={...ret,'tps':0}
                console.log(err);
            }
            ret={...ret,'tps':authData}

        })
        if(ret.status==0){
            ret.status=false
        }else{
            ret.status=true
        }
           
       res.json(ret)
        res.end();
    }

    async updatelicense(req,res){
        const update = await licenseService.updatelicense(req.body)
        res.json(update)
        res.end();
    }

    async updatestastus(req,res){
        const update = await licenseService.updatestastus(req.body)
        res.json(update)
        res.end();
    }
}
const LicenseController = new licenseController();
module.exports = LicenseController;
