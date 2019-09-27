let localConfig;
try {
  localConfig = require('../config/local.config');
} catch (e) {
  localConfig = {};
}
const fs = require('fs');
const uploadFile = require("node-upload-file");
const JSzip = require("jszip");
const version = require('../package.json').version;
const serviceIp = localConfig.serviceIp || 'http://192.168.23.10:3000';
// function writeFile(path, data) {
//   return new Promise(((resolve, reject) => {
//     fs.writeFile(path, data, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   }))
// }
function readFile(path) {
  return new Promise(((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }));
}
function compress() {
  var zip = new JSzip();
  var djweb = zip.folder(`djweb@${version}`);
  var theme = zip.folder(`djweb@${version}/theme`);
  var fonts = zip.folder(`djweb@${version}/theme/fonts`);
  return Promise.all([
    readFile(`./lib/djweb.common.browers.js`),
    readFile(`./lib/djweb.common.css`),
    readFile(`./lib/theme.css`),
    readFile(`./lib/fonts/element-icons.ttf`),
    readFile(`./lib/fonts/element-icons.woff`),
  ]).then((datas)=>{
    djweb.file('index.js', datas[0]);
    djweb.file('index.css', datas[1]);
    theme.file('index.css', datas[2]);
    fonts.file('element-icons.ttf', datas[3]);
    fonts.file('element-icons.woff', datas[4]);
    return zip.generateAsync({
      type: 'nodebuffer',
      platform: process.platform
    });
  });
}

function getModels(buffer) {
  const api = require('axios').create({
    baseURL: serviceIp + '/nodeService',
  });
  return api.post('/users/login', {
    password: 'djweb123456',
  }).then(res => {
    let token = res.headers['set-cookie'].find(str => str.includes('token')).split(';')[0];
    let djweb = uploadFile.file('djweb.zip');
    djweb._buffer = buffer;
    uploadFile.post(serviceIp + '/nodeService/fileStore/upload/djweb', {
      'type': `djweb@${version}`,
      'file': djweb
    }, true, {
      cookie: token
    }, function (result, data) {
      if (result) {
        console.log(JSON.parse(data.toString()).msg);
      }
    });
  });
}

compress().then(getModels).catch(err=>{
  console.error(err);
});
