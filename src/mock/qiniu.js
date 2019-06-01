const qiniu = require('qiniu')
//import shortid from 'shortid';

const qs = require('qs')
const Mock = require('mockjs')
const config = require('../config/config')
const { api } = config

const qnConfig = {
    accessKey: "accessKey",
    secretKey: "secretKey",
    bucket: "test",
    bucketUrl: "http://host"
}
const FSIZE_LIMIT = 10*1024*1024;


module.exports = {

  [`GET ${api.qiniuToken}`] (req, res) {

    console.log(qiniu.conf);

    // let type = req.query.type;
    // if(!type || type==='') {
    //     res.json({success: false, message: '缺少type参数'});
    //     return;
    // }

    //let ext = req.query.ext || '';//file extension name
    let mac = new qiniu.auth.digest.Mac(qnConfig.accessKey, qnConfig.secretKey);
    let {bucket, bucketUrl} = qnConfig;

    //let id = shortid.generate();
    //let key = 'geekspace/test';
    let url = bucketUrl;//+ '/' + key;
    //let callbackBody = type==='avatar' ? ''
    let putPolicy = new qiniu.rs.PutPolicy(bucket);
    //putPolicy.callbackUrl = callbackUrl;
    //putPolicy.callbackBody = 'key=$(key)&uid=' + uid + '&type=' + type;
    putPolicy.fsizeLimit = FSIZE_LIMIT;
    putPolicy.mimeLimit = 'image/*;';

    //let mac = new qiniu.auth.digest.Mac('accessKey', 'secretKey');

    let token = putPolicy.token(mac);
    console.log('gen token: ' + token);
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({success: true, data: {token: token, url: url}});
  }
}
