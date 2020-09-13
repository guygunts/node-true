const DBRepository = require('../../src/repositories/DBRepository');
class ErrorCode {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async getdropdown(req){
        let data=await this.DBRepository.executeQuery(``);
        let resultJson = {
            "data":data,
            "mess":'success'
        }
        return resultJson
    }
    async errorcodelist(){ 
        let columns=[]
        let columnname="code,http_status_code,cause,error_message_th,error_message_en,sbm_error_desc,cus_type"
        let columndata="code,http_status_code,cause,error_message_th,error_message_en,sbm_error_desc,cus_type"
        let arraycolumnstyle=[]
       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')
       for(let i=0; i<columnname.length; i++){ 
        let datajson
            
            datajson ={
                width:'250px'
            }
        
        arraycolumnstyle.push(datajson)
   }
        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field':arraycolumndata[e],
                'style':arraycolumnstyle[e]
            }
            columns.push(items)
        }

        let data=await this.DBRepository.executeQuery(`select id,code,http_status_code,cause,error_message_th,error_message_en,sbm_error_desc,cus_type from TB_M_Buypack_Error_Code `);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async errorcodeinsert (req){
        let error_message_th
        if(req.error_message_th != null){ 
            error_message_th=req.error_message_th.trim()
            
        }else{
            error_message_th=''
        }

        let error_message_en
        if(req.error_message_en != null){ 
            error_message_en=req.error_message_en.trim()
            
        }else{
            error_message_en=''
        }

        let sbm_error_desc
        if(req.sbm_error_desc != null){ 
            sbm_error_desc=req.sbm_error_desc.trim()
            
        }else{
            sbm_error_desc=''
        }


         await this.DBRepository.executeQuery(`INSERT INTO TB_M_Buypack_Error_Code (code,http_status_code,cause,error_message_th,error_message_en,sbm_error_desc,cus_type,create_dt,create_by)
         VALUES ('${req.code}','${req.http_status_code}','${req.cause.trim()}','${error_message_th}','${error_message_en}','${sbm_error_desc}','${req.cus_type}',CURRENT_TIMESTAMP,'${req.user}');`);  
        
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async errorcodeupdate(req){
        let error_message_th
        if(req.error_message_th != null){ 
            error_message_th=req.error_message_th.trim()
            
        }else{
            error_message_th=''
        }

        let error_message_en
        if(req.error_message_en != null){ 
            error_message_en=req.error_message_en.trim()
            
        }else{
            error_message_en=''
        }

        let sbm_error_desc
        if(req.sbm_error_desc != null){ 
            sbm_error_desc=req.sbm_error_desc.trim()
            
        }else{
            sbm_error_desc=''
        }
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Buypack_Error_Code set 
        code='${req.code}',
        http_status_code='${req.http_status_code}',
        cause='${req.cause.trim()}',
        error_message_th='${error_message_th}',
        error_message_en='${error_message_en}',
        sbm_error_desc='${sbm_error_desc}',
        cus_type='${req.cus_type}',
        update_dt=CURRENT_TIMESTAMP,
        update_by='${req.user}'
         where id=${req.id};`)

         let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async errorcodedelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_Buypack_Error_Code where id=${req[i].id}`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

}
const errorCode = new ErrorCode();
module.exports = errorCode;