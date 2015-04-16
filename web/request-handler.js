var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.url)
  if(req.method === 'GET'){
    if(req.url === '/'){
      // helper function
      // res.writeHead(200, helpers.headers);
      helpers.serveAssets(res, '/index.html', function(response){
        response.setHeader('content-type', 'text/html')
      });
    }

    if(req.url ==='/styles.css'){
      helpers.serveAssets(res, '/styles.css', function(response){
        response.setHeader('content-type', 'text/css')
      });
    } //else {
      //helpers.notFound(res);
    //}
  }

  if(req.method === 'POST'){
    console.log('Posting!')
    console.log(req._postData)
    var body = '';
    //begin processing: call readList with isUrl in list
    req.on('data', function(chunk) {
      console.log('body: '+chunk);
      body += chunk;
      body = body.slice(4);
      console.log(body);
      archive.readListOfUrls(archive.isUrlInList, res, body);
    });
  }
  // res.end(archive.paths.list);
};
