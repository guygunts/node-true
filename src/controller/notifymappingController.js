const NotifymappingService = require('../service/NotifymappingService');
class NotifymappingController {
    async getdataNotifymapping(req, res) {

        const ret = await NotifymappingService.getdropdown();
        res.json(ret);
        res.end();
    }
    async  Notifymappinglist(req, res) {

        const ret = await NotifymappingService.Notifymappinglist();
        res.json(ret);
        res.end();
    }
    
    async  Notifymappinginsert(req, res) {

        const ret = await NotifymappingService.Notifymappinginsert(req.body);
        res.json(ret);
        res.end();
    }

    async  Notifymappingdelete(req, res) {

        const ret = await NotifymappingService.Notifymappingdelete(req.body);
        res.json(ret);
        res.end();
    }

    async  Notifymappingedit(req, res) {

        const ret = await NotifymappingService.Notifymappingupdate(req.body);
        res.json(ret);
        res.end();
    }
}
const notifymappingController = new NotifymappingController();
module.exports = notifymappingController;