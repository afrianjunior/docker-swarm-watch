const request = require('request-promise-native')
const http = require('http')

let docker_host = null;
let docker_port = null;

if (process.env.DOCKER_HOST) {
  try {
      dh = process.env.DOCKER_HOST.split(":");
      docker_host = dh[0];
      docker_port = dh[1];
  } catch (err) {
      throw Error(err)
  }
}

let cert_path = null;
if (process.env.DOCKER_TLS_VERIFY) {
  if (process.env.DOCKER_CERT_PATH) {
      cert_path = process.env.DOCKER_CERT_PATH;
  } else {
      cert_path = (process.env.HOME || process.env.USERPROFILE) + "/.docker"
  }
}

module.exports = function (params) {
  var path = '/' + params;
  var jsonData = [];

  var options = {
      path,
      method: 'GET',
  }

  var request = http.request;

  if (cert_path) {
      request = https.request;
      options.ca = fs.readFileSync(cert_path + '/ca.pem');
      options.cert = fs.readFileSync(cert_path + '/cert.pem');
      options.key = fs.readFileSync(cert_path + '/key.pem');
  }

  if (docker_host) {
      options.host = docker_host;
      options.port = docker_port;
  } else if (process.platform === 'win32') {
      options.socketPath = '\\\\.\\pipe\\docker_engine';
  } else {
      options.socketPath = '/var/run/docker.sock';
  }

  return new Promise(function (resolve, reject) {
    var req = request(options, function (res) {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            jsonData = JSON.parse(data.toString());
            resolve(jsonData)
        });
      })
      req.on('error', (e) => {
          console.log(`problem with request: ${e.message}`);
          console.log(e.stack);
          reject(e)
      });
      req.end();
  })
}