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

        let client = await this.DBRepository.executeQuery(`select msisdn,DATE_FORMAT(created_dt, "%Y-%m-%d %T") as created_dt,created_by from TBL_M_BlackList ${sql}`);

        resultJson = {
            "code": '200',
            "column": [{ "field": 'msisdn', "header": 'MSISDN' }, { "field": 'created_dt', "header": 'Created Date' }, { "field": 'created_by', "header": 'Created By' }],
            "data": client
        }
        return resultJson
    }

    async BlacklistaddService(req,res) {
        let resultJson
        let data =await this.DBRepository.executeQuery(` select msisdn from TBL_M_BlackList where msisdn =${req.msisdn}`)
        if(data.length !== 0){
            resultJson = {
                "code":"500",
                "mess": 'duplicate number'
            }
            return resultJson
        }else{
            await this.DBRepository.executeQuery(`INSERT INTO TBL_M_BlackList (msisdn,created_dt,created_by)
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
        let data=await this.DBRepository.executeQuery(`select id,file,DATE_FORMAT(start, "%Y-%m-%d %T") start,DATE_FORMAT(end, "%Y-%m-%d %T") end,status,create_by,result_file from TBL_M_Batch_Blacklist`);
         resultJson = {
            "code": '200',
            "mess":'success',
            "column": [{ "field": 'file', "header": 'File' }, { "field": 'start', "header": 'Start Date' }, { "field": 'end', "header": 'End Date' },{ "field": 'status', "header": 'Status' },{ "field": 'create_by', "header": 'Create By' }],
            "data": data
        }
        return resultJson
    }

    async BlacklistlistdeleteService(req) {
        let resultJson
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete  from TBL_M_Batch_Blacklist where id=${req[i].id};`);
            }
        }else{
            await this.DBRepository.executeQuery(`delete  from TBL_M_Batch_Blacklist where id=${req.id};`);
        }
        
        resultJson = {
            "mess": 'success'
        }
        return resultJson
    }


    async BlacklistfileService(req) {
        let rec = req.time.split(" ")
        let datetime=rec[0].split("/")

        for(let i=1; i<=2; i++){
                for(let e=1; e<=9; e++){ 
                    if(datetime[i]==e){ 
                        let datanew="0"
                        datanew+=datetime[i]
                        datetime[i]=datanew
                        continue
                    }
                }
        }
        let newdate=datetime[0]+'-'+datetime[1]+'-'+datetime[2]+' '+rec[1]
        let resultJson
        await this.DBRepository.executeQuery(`INSERT INTO TBL_M_Batch_Blacklist (file,start,create_dt,create_by,status)
        VALUES('${req.filename}','${newdate}',CURRENT_TIMESTAMP,'${req.user}','new')`);

         resultJson = {
            "code": '200',
            "mess":'success'
        }
        return resultJson
    }
}
const blacklistService = new BlacklistService();
module.exports = blacklistService;