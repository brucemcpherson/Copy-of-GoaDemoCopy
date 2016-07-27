/**
 * namespace to deal with oauth
 * @namespace Oauth
 */
var Goth = (function(ns) {
  
  /**
   * get a goa or fail
   * @param {string} packageName the package name
   * @param {PropertiesService} [props=ScriptProperties]
   * @return {Goa} a goa
   */
  ns.getGoa = function (packageName,props) {

    return cGoa.GoaApp.createGoa(
      packageName , 
      props || PropertiesService.getScriptProperties()
    ).execute();

  }
  
  /**
   * get a token or fail
   * @param {string} [packageName=cloudvision] the package name
   * @param {PropertiesService} [props=ScriptProperties]
   * @return {Goa} a goa
   */
  ns.getToken = function (packageName,props) {

    var goa = ns.getGoa (packageName , props);
  
    if (!goa.hasToken()) {
      throw 'no token retrieved';
    }
    return goa.getToken();
  }
  
  return ns;
}) (Goth || {});
