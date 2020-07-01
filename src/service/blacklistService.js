const DBRepository = require('../../src/repositories/DBRepository');

class BlacklistService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async BlacklistService(req) {
        let resultJson
        let sql = 'where 1=1'

        if (req.msisdn !== '' && req.msisdn !== null) {
            sql += ` and msisdn =${req.msisdn}`
        }

        let client = await this.DBRepository.executeQuery(`select msisdn,DATE_FORMAT(created_at, "%Y-%m-%d %T") as created_at,DATE_FORMAT(updated_at, "%Y-%m-%d %T") as updated_at from TBL_M_BlackList ${sql}`);

        resultJson = {
            "code": '200',
            "column": [{ "field": 'msisdn', "header": 'MSISDN' }, { "field": 'created_at', "header": 'Created By' }, { "field": 'updated_at', "header": 'Update By' }],
            "data": client
        }
        return resultJson
    }

    async BlacklistaddService(req,res) {
        let resultJson
        let data =await this.DBRepository.executeQuery(` select msisdn from TBL_M_BlackList where msisdn =${req.msisdn}`)
        if(data[0] !== 0){
            resultJson = {
                "code":"500",
                "mess": 'duplicate number'
            }
            return resultJson
        }else{
            await this.DBRepository.executeQuery(`INSERT INTO TBL_M_BlackList (msisdn,created_at,created_by)
    VALUES(${req.msisdn},CURRENT_TIMESTAMP,'${req.user}');`);
        }
        
        resultJson = {
            "mess": 'success'
        }
        return resultJson
    }

    async BlacklistdeleteService(req) {
        let resultJson
        await this.DBRepository.executeQuery(`delete  from TBL_M_BlackList where msisdn=${req.msisdn};`);
        resultJson = {
            "mess": 'success'
        }
        return resultJson
    }

    async BlacklistlistService(req) {
        let resultJson
        await this.DBRepository.executeQuery(`select file,start,end,status,create_by,result_file from TBL_M_Batch_Blacklist`);
        resultJson = {
            "mess": 'success'
        }
        return resultJson
    }
}
const blacklistService = new BlacklistService();
module.exports = blacklistService;