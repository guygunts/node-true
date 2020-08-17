const DBRepository = require('../../src/repositories/DBRepository');
class Maxrate {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async getdatamax(req){
        let data=await this.DBRepository.executeQuery(`select id,sbm_speed_min,sbm_speed_max,max_bit_rate,video_quality from TB_M_MaxRate_Mapping where id=${req}`);
        let resultJson = {
            "data":data,
            "mess":'success'
        }
        return resultJson
    }
    async maxratelist(){ 
        let columns=[]
        let columnname="sbm_speed_min,sbm_speed_max,max_bit_rate,video_quality"
        let columndata="sbm_speed_min,sbm_speed_max,max_bit_rate,video_quality"

       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')

        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field': arraycolumndata[e]
            }
            columns.push(items)
        }

        let data=await this.DBRepository.executeQuery(`select id,sbm_speed_min,sbm_speed_max,max_bit_rate,video_quality from TB_M_MaxRate_Mapping `);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async maxrateinsert (req){
        await this.DBRepository.executeQuery(`INSERT INTO TB_M_MaxRate_Mapping (sbm_speed_min,sbm_speed_max,max_bit_rate,video_quality,create_dt,create_by) 
        VALUES ('${req.sbm_speed_min}','${req.sbm_speed_max}','${req.max_bit_rate}','${req.video_quality}',CURRENT_TIMESTAMP,'${req.user}');`);  
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async maxrateupdate(req){
        await this.DBRepository.executeQuery(`UPDATE  TB_M_MaxRate_Mapping set sbm_speed_min='${req.sbm_speed_min}', sbm_speed_max='${req.sbm_speed_max}', max_bit_rate='${req.max_bit_rate}',video_quality='${req.video_quality}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}' where id=${req.id};`)
    }

    async maxratedelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_MaxRate_Mapping where id=${req[i].id}`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

}
const maxrate = new Maxrate();
module.exports = maxrate;