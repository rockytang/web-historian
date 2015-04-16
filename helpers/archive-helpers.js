var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');
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
  fs.readFile('../archives/sites.txt','utf8' ,function(err,data){
    var parseData = JSON.parse(data);
    if(callback) {callback(parseData, res, url);}
  })
};

//readListOfUrls(isUrlInList)
exports.isUrlInList = function(parseData, res, url){
  //check for url in sites.txt
  var length = parseData.urls.length;

  for(var i = 0; i < length; i++){
    console.log('comparing: '+parseData.urls[i].site);
    console.log('desired url: '+url);
    if(parseData.urls[i].site === url){
      console.log("isUrlinList is true!")
      //alert user that it is already in the list
      //some http-helper function

    }
  }
  console.log("isUrlinList is false!")

  //do something
  //add it to the list
  exports.addUrlToList(parseData,res,url);
};

exports.addUrlToList = function(parseData, res, url){
  //push into array
  var ourSite = {
    "site": url,
    "archived":false };
  parseData.urls.push(ourSite);

  fs.writeFile('../archives/sites.txt', JSON.stringify(parseData),
    function(){helpers.redirect(res, '/loading.html')})
  //write sites.txt
  //some http-helper function
};

exports.isURLArchived = function(){
  //check if a url is archived
};

exports.downloadUrls = function(){
  //??? use http get library to save snapshot of site
};
