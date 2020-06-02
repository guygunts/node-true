const axios = require('axios');
const https = require('https');
const pathdev = require('dotenv').config({ path: '././config/dev.env' });
class AdjustSpeedService {

    async AdjustSpeedService(req, response) {
        const httpsAgent = new https.Agent({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Request',
                'X-platform': 'Node'
            },
            rejectUnauthorized: false,
            auth: {
                username: 'CPVAS_DPA',
                password: 'DPAOPER1'
            }
        });
        let params = {

            "maxMediaRateKbps": req.maxMediaRateKbps,
            "cpidState": req.cpidState,
            "expirationTime": req.expirationTime,
            "bulkName": "manual",
            "updateBy": "Foo"

        }
        console.log('CPID:', req.CPID, 'TYPE:', req.type)
        //let url = `http://10.255.193.168:8380/dpa/${req.CPID}/adjustspeed?key_type=${req.type}&client_id=${pathdev.parsed.clientId}`
        let url = `https://mdpdpa.truecorp.co.th/dpa/${req.CPID}/adjustspeed?key_type=${req.type}&client_id=mobiledataplan&tag=YTB`

        const data = await axios.post(url, params, {
                httpsAgent: httpsAgent,
                auth: {
                    username: 'CPVAS_DPA',
                    password: 'DPAOPER1'
                }
            })
            .then(res => {
                return res.data
            })
            .catch(e => {
                return e.response.data
            })
        return data
    }
}

const adjustSpeedService = new AdjustSpeedService();
module.exports = adjustSpeedService;
