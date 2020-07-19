const DBRepository = require('../../src/repositories/DBRepository');
class Planoffer {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async offerlist(){ 
        let columns=[]
        let columnname="Payment_Type,offer_promoMessage,operatorBrandName,planName,planId,planDescription,promoMessage,languageCode,overusagePolicy,maxRateKbps,currencyCode,units,nanos,duration,offerContext,trafficCategories,connectionType,refreshPeriod,quotaBytes,quotaMinutes,expireTime,formOfPayment, create_dt,create_by,update_dt,update_by"

        let columndata="Payment_Type,offer_promoMessage,operatorBrandName,planName,planId,planDescription,promoMessage,languageCode,overusagePolicy,maxRateKbps,currencyCode,units,nanos,duration,offerContext,trafficCategories,connectionType,refreshPeriod,quotaBytes,quotaMinutes,expireTime,formOfPayment,create_dt,create_by,update_dt,update_by"

       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')

        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field': arraycolumndata[e]
            }
            columns.push(items)
        }

        let data=await this.DBRepository.executeQuery(`select id,Payment_Type,offer_promoMessage,operatorBrandName,planName,planId,planDescription,promoMessage,languageCode,overusagePolicy,maxRateKbps, currencyCode,units,nanos,duration,offerContext,trafficCategories,connectionType,refreshPeriod,quotaBytes,quotaMinutes,DATE_FORMAT(expireTime, "%Y-%m-%d %T") expireTime ,formOfPayment,DATE_FORMAT(create_dt, "%Y-%m-%d %T") create_dt, create_by,DATE_FORMAT(update_dt, "%Y-%m-%d %T") update_dt,update_by from TB_M_Plan_Offers`);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async offerinsert(req){ 
        let rec = req.expireTime.split(" ")
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
        await this.DBRepository.executeQuery(`INSERT INTO TB_M_Plan_Offers (Payment_Type, offer_promoMessage, operatorBrandName, planName, planId, planDescription, promoMessage, languageCode, overusagePolicy, maxRateKbps, currencyCode, units, nanos, duration, offerContext, trafficCategories, connectionType, refreshPeriod, quotaBytes, quotaMinutes, expireTime, formOfPayment, create_dt, create_by) 
        VALUES ('${req.Payment_Type}','${req.offer_promoMessage}','${req.operatorBrandName}','${req.planName}','${req.planId}','${req.planDescription}','${req.promoMessage}','${req.languageCode}','${req.overusagePolicy}','${req.maxRateKbps}','${req.currencyCode}','${req.units}','${req.nanos}','${req.duration}','${req.offerContext}','${req.trafficCategories}','${req.connectionType}','${req.refreshPeriod}','${req.quotaBytes}','${req.quotaMinutes}','${newdate}','${req.formOfPayment}',CURRENT_TIMESTAMP,'${req.user}');`);  
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async offerdelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_Plan_Offers where id=${req[i].id}`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async offeredit(req){ 
        let rec = req.expireTime.split(" ")
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
        
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Plan_Offers set Payment_Type='${req.Payment_Type}', offer_promoMessage='${req.offer_promoMessage}', operatorBrandName='${req.operatorBrandName}', planName='${req.planName}', planId='${req.planId}', planDescription='${req.planDescription}', promoMessage='${req.promoMessage}', languageCode='${req.languageCode}', overusagePolicy='${req.overusagePolicy}', maxRateKbps='${req.maxRateKbps}', currencyCode='${req.currencyCode}', units='${req.units}', nanos='${req.nanos}', duration='${req.duration}', offerContext='${req.offerContext}', trafficCategories='${req.trafficCategories}', connectionType='${req.connectionType}', refreshPeriod='${req.refreshPeriod}', quotaBytes='${req.quotaBytes}', quotaMinutes='${req.quotaMinutes}', expireTime='${newdate}', formOfPayment='${req.formOfPayment}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}' where id=${req.id};`)

        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }


}
const planoffer = new Planoffer();
module.exports = planoffer;