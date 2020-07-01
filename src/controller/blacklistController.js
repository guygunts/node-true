const blacklistService =require('../service/blacklistService');
class BlacklistController {
  async BlacklistController(req, res) {

    const ret = await blacklistService.BlacklistService(req.body);
      res.json(ret);
      res.end();
  }
  async BlacklistaddController(req, res) {

    const ret = await blacklistService.BlacklistaddService(req.body);
    if(ret.code == 500){
        res.status(500).send({ error: ret.mess })
        res.end();
    }
      res.json(ret);
      res.end();
  }
  async BlacklistdeleteController(req, res) {

    const ret = await blacklistService.BlacklistdeleteService(req.body);
      res.json(ret);
      res.end();
  }
}
const blacklistController = new BlacklistController();
module.exports= blacklistController;