const DBRepository = require('../../src/repositories/DBRepository');
class Planoffer {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async offerlist(req){ 
        let columns=[]
        let columnname="Payment_Type,offer_promoMessage,operatorBrandName,planName,planId,planDescription,promoMessage,languageCode,overusagePolicy,maxRateKbps, currencyCode,units,nanos,duration,offerContext,trafficCategories,connectionType,refreshPeriod,quotaBytes,quotaMinutes,expireTime,formOfPayment, create_dt, create_by,update_dt,update_by"

        let columndata="Payment_Type,offer_promoMessage,operatorBrandName,planName,planId,planDescription,promoMessage,languageCode,overusagePolicy,maxRateKbps, currencyCode,units,nanos,duration,offerContext,trafficCategories,connectionType,refreshPeriod,quotaBytes,quotaMinutes,expireTime,formOfPayment, create_dt, create_by,update_dt,update_by"

       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')

        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field': arraycolumndata[e]
            }
            columns.push(items)
        }

        let data=await this.DBRepository.executeQuery(`select Payment_Type,offer_promoMessage,operatorBrandName,planName,planId,planDescription,promoMessage,languageCode,overusagePolicy,maxRateKbps, currencyCode,units,nanos,duration,offerContext,trafficCategories,connectionType,refreshPeriod,quotaBytes,quotaMinutes,expireTime,formOfPayment,DATE_FORMAT(create_dt, "%Y-%m-%d %T") create_dt, create_by,DATE_FORMAT(update_dt, "%Y-%m-%d %T") update_dt,update_by from TB_M_Plan_Offers`);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async offerinsert(req){ 
        await this.DBRepository.executeQuery(`INSERT INTO TB_M_Plan_Offers (Payment_Type, offer_promoMessage, operatorBrandName, planName, planId, planDescription, promoMessage, languageCode, overusagePolicy, maxRateKbps, currencyCode, units, nanos, duration, offerContext, trafficCategories, connectionType, refreshPeriod, quotaBytes, quotaMinutes, expireTime, formOfPayment, create_dt, create_by) 
        VALUES ('','','','','','','','','','','','','','','','','','','','','','',CURRENT_TIMESTAMP,'');`);  
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async offerdelete(req){ 
        let data=await this.DBRepository.executeQuery(`delete from TB_M_Plan_Offers where id=${req.id}`);
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async offeredit(req){ 
        await this.DBRepository.executeQuery(`UPDATE INTO TB_M_Plan_Offers (Payment_Type, offer_promoMessage, operatorBrandName, planName, planId, planDescription, promoMessage, languageCode, overusagePolicy, maxRateKbps, currencyCode, units, nanos, duration, offerContext, trafficCategories, connectionType, refreshPeriod, quotaBytes, quotaMinutes, expireTime, formOfPayment, update_dt, update_by) 
        VALUES ('','','','','','','','','','','','','','','','','','','','','','',CURRENT_TIMESTAMP,'');`);  

        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }


}
const planoffer = new Planoffer();
module.exports = planoffer;