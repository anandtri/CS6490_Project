"use strict";
exports.__esModule = true;
var grpc_web_client = require("grpc-web-client");
var decloak_pb = require("./decloak_pb");
var decloak_pb_service = require("./decloak_pb_service");

var BLACKLIST = "";
getValue("blacklist", (bl) => {
  if(typeof bl != 'undefined') {
    BLACKLIST = bl;
  }
});

var WHITELIST = "";
getValue("whitelist", (wl) => {
  if(!wl || wl == "") {
    WHITELIST = "https://www.google.com;";
    saveValue("whitelist", WHITELIST);
  }
  WHITELIST = wl;
});

/**
 * Get Set storage
 */
function getValue(key, callback) {
  chrome.storage.sync.get(key, (items) => {
    callback(chrome.runtime.lastError ? null : items[key]);
  });
}
function saveValue(key, value) {
  var items = {};
  items[key] = value;
  chrome.storage.sync.set(items);
}

/**
* Get the current URL.
*
* @param {function(string)} callback called when the URL of the current tab
*   is found.
*/
function getCurrentTab(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];

    callback(tab);
  });
}
function getCurrentTabUrl(callback) {
// Query filter to be passed to chrome.tabs.query - see
// https://developer.chrome.com/extensions/tabs#method-query
var queryInfo = {
  active: true,
  currentWindow: true
};

chrome.tabs.query(queryInfo, (tabs) => {
  // chrome.tabs.query invokes the callback with a list of tabs that match the
  // query. When the popup is opened, there is certainly a window and at least
  // one tab, so we can safely assume that |tabs| is a non-empty array.
  // A window can only have one active tab at a time, so the array consists of
  // exactly one tab.
  var tab = tabs[0];

  // A tab is a plain object that provides information about the tab.
  // See https://developer.chrome.com/extensions/tabs#type-Tab
  var url = tab.url;

  // tab.url is only available if the "activeTab" permission is declared.
  // If you want to see the URL of other tabs (e.g. after removing active:true
  // from |queryInfo|), then the "tabs" permission is required to see their
  // "url" properties.
  console.assert(typeof url == 'string', 'tab.url should be a string');

  callback(url);
}); //end of chrome.tabs.query
} //end of getCurrentTabUrl

var mlapp_host = "127.0.0.1:50052";
var page_source = "";
chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    if (message.action == "mlapp_address") {
      mlapp_host = message.mlapp_host;
    }
    /*else if (message.action == 'getSource') {
      alert("in getSource: "+ message.source);
      console.log("in getSource");
      page_source = message.source;
      //chrome.tabs.executeScript({file: "get_source.js"}, callback);
    }*/
    else if (message.action == "updateBlacklist") {
      BLACKLIST = message.blacklist;
    }
    else if (message.action == "updateWhitelist") {
      WHITELIST = message.whitelist;
    }
});

var final_url = "";
chrome.webRequest.onBeforeRedirect.addListener((data) => {
  console.log("redirecting to "+data.redirectUrl);
  //alert("redirecting to url:"+ data.redirectUrl);
  final_url = data.redirectUrl;
}, {urls: ["<all_urls>"], types:["main_frame"]}, ["responseHeaders"]);
/**
 * Doing this in onBeforeRequest to make it blockingResponse

chrome.webRequest.onCompleted.addListener((data) => {
    var grpc_proxy_host  = "http://localhost:5000/isCloaked";
    if(data.url == grpc_proxy_host) {
      return;
    }

    var arr = data.url.split("/");
    var domain = arr[0] + "//" + arr[2];
    ///alert("whitelist: " + WHITELIST + " and domain=" + domain);
    if(WHITELIST.includes(domain)) {
      return;
    }
    var params = {mlapp_address:mlapp_host, content:page_source, url:data.url, statusCode:data.statusCode, statusLine: data.statusLine};
        $.ajax({
              url: grpc_proxy_host,
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify(params),
              success: function(msg) {
                msg = JSON.parse(msg);
                console.log("Success: " + JSON.stringify(msg));
                if(msg.cloaked) {
                  if(confirm("URL " + data.url + " is CLOAKED!. Reason: " + msg.response + ".\n Add to Blacklist?")) {
                    getValue("blacklist", (blacklist) => {
                      if(!blacklist)
                        blacklist = "";
                      //alert("blacklist existing: " + blacklist);

                      blacklist += domain + ";" ;
                      saveValue("blacklist", blacklist);
                      BLACKLIST = blacklist;
                    });
                  }
                }
              },
              error: function(msg) {
                msg = JSON.parse(msg);
                console.log("Error: " + JSON.stringify(msg));
                alert("error: " + JSON.stringify(msg));
              }
            });
}, {urls: ["<all_urls>"], types:["main_frame"]}, ["responseHeaders"]);
*/
chrome.webRequest.onBeforeRequest.addListener((data) => {
  var cancel = false;
  //Check the URL against the blacklist
  var arr = data.url.split("/");
  var domain = arr[0] + "//" + arr[2];
  //Do not check blacklist if whitelisted
  if(WHITELIST && !WHITELIST.includes(domain)) {
    if(BLACKLIST && BLACKLIST.includes(domain)) {
      //alert("Domain: " + domain + " is blacklisted!! Terminating request");
      var blockingResponse = {}
      blockingResponse.cancel = true;
      return blockingResponse;
    }
  }

  //Get the source of the page yourself in a separate request
  $.ajax({
    async: false,
    method: "GET",
    url: data.url,
    success: (source, status, jqXHR) => {
      var statusCode = jqXHR.status;
      var statusLine = jqXHR.statusText;
      //alert("statusCode: " + statusCode + " and statusLIne:" + statusLine );
      page_source = source;

      // Block and perform the cloak check
      var grpc_proxy_host  = "http://localhost:5000/isCloaked";
      if(data.url == grpc_proxy_host) {
        return;
      }

      if(WHITELIST.includes(domain)) {
        return;
      }

      var params = {mlapp_address:mlapp_host, content:page_source, url:data.url, statusCode:statusCode, statusLine: statusLine};
          $.ajax({
                async: false,
                url: grpc_proxy_host,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(params),
                success: function(msg) {
                  msg = JSON.parse(msg);
                  console.log("Success: " + JSON.stringify(msg));
                  if(msg.cloaked) {
                    if(confirm("URL " + data.url + " is CLOAKED!. Reason: " + msg.response + ".\n Add to Blacklist and stop loading?")) {
                      getValue("blacklist", (blacklist) => {
                        if(!blacklist)
                          blacklist = "";
                        //alert("blacklist existing: " + blacklist);

                        blacklist += domain + ";" ;
                        saveValue("blacklist", blacklist);
                        BLACKLIST = blacklist;
                      });
                      cancel = true;
                    }
                  }
                },
                error: function(msg) {
                  msg = JSON.parse(msg);
                  console.log("Error: " + JSON.stringify(msg));
                  alert("error: " + JSON.stringify(msg));
                }
              });
    }
  }); //end of $.ajax
  if(cancel) {
    var blockingResponse = {}
    blockingResponse.cancel = true;
    return blockingResponse;
  }
},  //end of onBeforeRequest Callback
{urls: ["<all_urls>"], types:["main_frame"]}, ["blocking"]); //end of onBeforeRequest
