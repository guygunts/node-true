const DBRepository = require('../../src/repositories/DBRepository');
class Planoffer {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async offerlist(){ 
        let columns=[]
        let columnname="Payment_Type,Company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment"

        let columndata="Payment_Type,Company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment"
        let dropdown=await this.DBRepository.executeQuery(`select code label ,code value  from TB_M_Package`)
       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')

        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field': arraycolumndata[e]
            }
            columns.push(items)
        }

        let data=await this.DBRepository.executeQuery(`select Payment_Type,Company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment from TB_M_Plan_Offers`);

        let resultJson = {
            "dropdown":dropdown,
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async offerinsert(req){ 
        try{
            let datainsert =await this.DBRepository.executeQuery(`select company,tss_description_th,tss_description_en,price from TB_M_Package where code='${req.planId}'`)

            await this.DBRepository.executeQuery(`INSERT INTO TB_M_Plan_Offers (Payment_Type,company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment,create_dt,create_by) 
            VALUES ('${req.Payment_Type}','${datainsert[0].company}','${req.promoMessage_th}','${req.promoMessage_en}','${datainsert[0].tss_description_th}',${datainsert[0].tss_description_en},'${req.planId}','${req.price}','${req.formOfPayment}',CURRENT_TIMESTAMP,'${req.user}');`);  
            let resultJson = {
                "mess":'success'
            }
            return resultJson
        }catch(err){ 
            return err
        }
        // let rec = req.expireTime.split(" ")
        // let datetime=rec[0].split("/")

        // for(let i=1; i<=2; i++){
        //         for(let e=1; e<=9; e++){ 
        //             if(datetime[i]==e){ 
        //                 let datanew="0"
        //                 datanew+=datetime[i]
        //                 datetime[i]=datanew
        //                 continue
        //             }
        //         }
        // }
       
    }

    async offerdelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_Plan_Offers where planId='${req[i].planId}'`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async offeredit(req){ 
        // let rec = req.expireTime.split(" ")
        // let datetime=rec[0].split("/")

        // for(let i=1; i<=2; i++){
        //         for(let e=1; e<=9; e++){ 
        //             if(datetime[i]==e){ 
        //                 let datanew="0"
        //                 datanew+=datetime[i]
        //                 datetime[i]=datanew
        //                 continue
        //             }
        //         }
        // }
        // let newdate=datetime[0]+'-'+datetime[1]+'-'+datetime[2]+' '+rec[1]
        
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Plan_Offers set Payment_Type='${req.Payment_Type}', promoMessage_th='${req.promoMessage_th}',promoMessage_en='${req.promoMessage_en}', formOfPayment='${req.formOfPayment}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}' where planId='${req.planId}'`)

        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }


}
const planoffer = new Planoffer();
module.exports = planoffer;