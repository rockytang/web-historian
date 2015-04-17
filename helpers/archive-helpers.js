var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');
var request = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback, res, url){
  //read sites.txt
  //return sites as an array of objects
  fs.readFile(exports.paths['list'],'utf8' ,function(err,data){
    console.log('data: '+data)
    var parseData = JSON.parse(data);
    if(callback) {callback(parseData, res, url);}
  })
};

//readListOfUrls(isUrlInList)
exports.isUrlInList = function(parseData, res, url){
  //check for url in sites.txt
  var length = parseData.urls.length;
  var isFound = false;

  for(var i = 0; i < length && !isFound; i++){
    console.log('comparing: '+parseData.urls[i].site);
    console.log('desired url: '+url);
    if(parseData.urls[i].site === url){
      console.log("isUrlinList is true!")
      //alert user that it is already in the list
      //some http-helper function
      isFound = true;
    }
  }

  if(isFound){helpers.redirect(res, '/'+url) } else {
    exports.addUrlToList(parseData,res,url);
    console.log("isUrlinList is false!")
  }

  //do something
  //add it to the list
};

exports.addUrlToList = function(parseData, res, url){
  //push into array
  var ourSite = {
    "site": url,
    "archived":false };
  parseData.urls.push(ourSite);

  fs.writeFile(exports.paths['list'], JSON.stringify(parseData),
    function(){helpers.redirect(res, '/loading.html')})
  //write sites.txt
  //some http-helper function
};

exports.isURLArchived = function(){
  //check if a url is archived
};

exports.downloadUrls = function(parseData){
  //??? use http get library to save snapshot of site
  var urls = parseData.urls;
  for(var i = 0; i < urls.length; i++){
    // check if url is archived: if(!urls[i].archived)
    if(!urls[i].archived) {
      //if not, archive it
      urls[i].archived = true;
      fs.writeFile(exports.paths['list'], JSON.stringify(parseData))
      var site = urls[i].site;
      request.get({ url: 'http://'+site }, exports.paths['archivedSites']+'/'+site,
        function(err, res) {
          if(err) { console.error(err); return; }
          console.log(res.code, res.headers, res.file);
        });
    }
    // get url out of object: var site = urls[i].site;
    // set archived to true
    // do request.get with url options: { url: site }
    // save it to archives/sites folder

    // request.get()

  }
};
