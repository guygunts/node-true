const offerService = require('../service/planofferService');
class OfferController {
    async Offerlist(req, res) {

        const ret = await offerService.offerlist();
        res.json(ret);
        res.end();
    }

    async offerinsert(req, res) {

        const ret = await offerService.offerinsert(req.body);
        res.json(ret);
        res.end();
    }

    async offerdelete(req, res) {

        const ret = await offerService.offerdelete(req.body);
        res.json(ret);
        res.end();
    }

    async offeredit(req, res) {

        const ret = await offerService.offeredit(req.body);
        res.json(ret);
        res.end();
    }
}
const offerController = new OfferController();
module.exports = offerController;