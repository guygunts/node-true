const DBRepository = require('../../src/repositories/DBRepository');

class licenseService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async license(){
        let resultJson
    let client =  await this.DBRepository.executeQuery("select license_key from TB_M_License");
    let status =  await this.DBRepository.executeQuery("select disable_pas from TB_M_Youtube_PAS_Config;");
    if (client[0].length != 0) {
            resultJson = {
                "license":client[0].license_key,
                "status":status[0].disable_pas
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

    async updatestastus(req){
        let resultJson
        let client =  await this.DBRepository.executeQuery(`UPDATE TB_M_Youtube_PAS_Config SET disable_pas =${req.status},update_dt=CURRENT_TIMESTAMP(),update_by="${req.user}"`);
        if (client) {
                resultJson = {
                    "mess":'success'
                }
        return resultJson
    }
    }
}

const LicenseService = new licenseService();
module.exports = LicenseService;