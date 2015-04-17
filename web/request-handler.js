var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers')
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.url)
  if(req.method === 'GET'){
    if(req.url === '/'){
      req.url = '/index.html'
    }

    fs.exists(archive.paths['siteAssets'] + req.url, function(exists){
      if(exists) {

        if(req.url === '/index.html'){
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
        if(req.url === '/loading.html'){
          helpers.serveAssets(res, '/loading.html', function(response){
            response.setHeader('content-type', 'text/html')
          });
        }

        if(req.url === '/archived.html'){
          helpers.serveAssets(res, '/archived.html', function(response){
            response.setHeader('content-type', 'text/html')
          });
        }
      } else {
        fs.exists(archive.paths['archivedSites'] + req.url, function(exists){
          if(exists) {
            // serve site page
            helpers.serveSite(res, req.url) //ex. '/www.google.com'
          } else {
            // server 404 page
            helpers.notFound(res)
          }
        })
      }

    })
     //use fs.exists(...) to check if the path is in public
      //if it does exist, serve it
      //if it does not, use fs.exists(...) to check if the path is in archives/sites
        //if it does not, 404 error
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
