const DBRepository = require('../../src/repositories/DBRepository');

class licenseService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async license(){
        let resultJson
    let client =  await this.DBRepository.executeQuery("select license_key from TB_M_License");
    if (client[0].length != 0) {
            resultJson = {
                "license":client[0].license_key
            }
    return resultJson
}
    }

    async updatelicense(req){
        let resultJson
    let client =  await this.DBRepository.executeQuery("UPDATE TB_M_License SET license_key = ?",[req.token]);
    if (client) {
            resultJson = {
                "mess":'Signature Verified'
            }
    return resultJson
}
    }
}

const LicenseService = new licenseService();
module.exports = LicenseService;