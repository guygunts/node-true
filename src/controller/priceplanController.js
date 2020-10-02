const priceplanService = require('../service/priceplanService');
class PriceplanController {
    async getdatapriceplan(req, res) {

        const ret = await priceplanService.getdatapriceplan();
        res.json(ret);
        res.end();
    }
    async  priceplanlist(req, res) {

        const ret = await priceplanService.priceplanlist();
        res.json(ret);
        res.end();
    }
    async  priceplandelete(req, res) {

        const ret = await priceplanService.priceplandelete(req.body);
        res.json(ret);
        res.end();
    }

    async  priceplanedit(req, res) {

        const ret = await priceplanService.priceplanupdate(req.body);
        res.json(ret);
        res.end();
    }
}
const priceplanController = new PriceplanController();
module.exports = priceplanController;