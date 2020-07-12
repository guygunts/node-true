const blacklistService =require('../service/blacklistService');
const pathdev=require('dotenv').config({ path: './config/dev.env' });
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
  
  async BlacklistlistdeleteController(req, res) {

    const ret = await blacklistService.BlacklistlistdeleteService(req.body);
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
    
    var dir = `${pathdev.parsed.paths_file}//upload//`;
    var dir1 = `${pathdev.parsed.paths_file}//result//`;
    console.log(`Current directory: ${process.cwd()}`);
    if (!filessystem.existsSync(dir)) {
        filessystem.mkdirSync(dir);
    }
    if (!filessystem.existsSync(dir1)) {
        filessystem.mkdirSync(dir1);
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
        // var path = require('path');
        // var filePath = path.resolve(`${pathdev.parsed.paths_file}//upload//${req.files[0].filename}`);
        let data={
            "filename":`${req.files[0].filename}`,
            "time":req.body.time,
            "user":req.body.user
        }
        const ret = blacklistService.BlacklistfileService(data);
        res.json(ret);
        res.end();

    })
  }

  async BlacklistdownloadController(req, res) {
    let path = require('path');
     const file = path.resolve(__dirname, `../../result/${req.body.file}`);
    // const file = path.resolve(__dirname, `../../upload/answer_social.csv-1593745823314`);
    res.setHeader("Content-Type", "text/csv;charset=utf-8");
    res.download(file); 
  }



}
const blacklistController = new BlacklistController();
module.exports= blacklistController;