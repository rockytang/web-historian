var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile('public' + asset, function(err,data){
    // console.log("we are here 2!")

    callback(res);
    res.writeHead(200, headers);
    // console.log('wrote head')
    //cb to change content-type

    // console.log('data: '+data)
    var dataString = data.toString();
    res.end(dataString);
  })

};

exports.notFound = function(res){
  res.writeHead(404, headers);
  res.end('404 Not Found');
}



// As you progress, keep thinking about what helper functions you can put here!
