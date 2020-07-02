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

  async BlacklistlistController(req, res) {

    const ret = await blacklistService.BlacklistlistService(req.body);
    // res.status(ret.code).send(ret.mess)
      res.json(ret);
      res.end();
  }

  async BlacklistfileController(req, res) {
    var multer = require('multer')

    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'upload/');
        },
        filename: (req, file, cb) => {
            
            cb(null, file.originalname + '-' + Date.now()) 
        }
    });
    var upload = multer({ storage }).any()
   
    var filessystem = require('fs');
    
    var dir = './upload/';
    console.log(`Current directory: ${process.cwd()}`);
    if (!filessystem.existsSync(dir)) {
        filessystem.mkdirSync(dir);
    }
     upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return
        } else if (err) {
            console.log(err)
            return
        }
        if (err) {
            return res.end(err);
        }
       

        const excelToJson = require('convert-excel-to-json');
        var path = require('path');
        var filePath = path.resolve('./' + '//upload//' + req.files[0].filename);
        let data={
            "filename":filePath,
            "time":req.body.time,
            "user":req.body.user
        }
        const ret = blacklistService.BlacklistfileService(data);
        res.json(ret);
        res.end();

    })
  }
}
const blacklistController = new BlacklistController();
module.exports= blacklistController;