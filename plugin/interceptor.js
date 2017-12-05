"use strict";
exports.__esModule = true;
var grpc_web_client = require("grpc-web-client");
var decloak_pb = require("./decloak_pb");
var decloak_pb_service = require("./decloak_pb_service");
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
});
}
chrome.webRequest.onBeforeRedirect.addListener((data) => {
  console.log("redirecting to "+data.redirectUrl);
  alert("redirecting to url:"+ data.redirectUrl);
}, {urls: ["<all_urls>"]}, ["responseHeaders"]);

chrome.webRequest.onCompleted.addListener((data) => {
  /*getCurrentTabUrl((url) => {
      /*The below check is required because a single user URL request
       * might(and mostly does) translate to many different requests
       */
      /*if(data.url == url) {
          console.log("event fired "+data.url);
          alert("accessing url:"+ data.url);
      }
  });*/
    //alert(data.tabId);
    chrome.pageCapture.saveAsMHTML({"tabId":859}, function(pageContentBlob){
      var reader = new FileReader();
      reader.onload = function(e) { //fires when all the page content blob is read
        var webPage = new decloak_pb.WebPage();
        webPage.url = data.url;
        webPage.status = data.statusCode;
        webPage.reason = data.statusLine;
        webPage.redirtype = proto.decloak.WebPage.RedirectType.NONE;
        webPage.body = e.target.result;

        var listWebPage = new decloak_pb.ListWebPage();
        listWebPage[0] = webPage;
        grpc_web_client.grpc.unary(decloak_pb_service.CloakDetector.isCloaked, {
            debug: false,// optional - enable to output events to console.log
            request: listWebPage,
            host: "http://localhost:8080",
            onEnd: function (res) {
              //alert("in onEnd function");
              var status = res.status, statusMessage = res.statusMessage;
              var headers = res.headers, message = res.message, trailers = res.trailers;
              if(status) {
                console.log("MLapp return status: " + status + " Status Message:" + statusMessage);
              }
              if(message) {
                alert(typeof(message.toObject()));
              }
              if (status === grpc_web_client.Code.OK && message) {
                console.log("all ok. got response from mlapp: ", message.toObject());

              }
            } //end of onEnd
        }); //end of unary


      }; //end of onload
      reader.readAsText(pageContentBlob);
    }); //end of saveAsMHTML

}, {urls: ["<all_urls>"]}, ["responseHeaders"]);
