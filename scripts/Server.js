
function expose (namespace , method) {
   return this[namespace][method]
  .apply(this,Array.prototype.slice.call(arguments,2));
}

/**
 * runs on the server side
 * for testing whether libraries have an effect
 * @namespace Server
 */
var Server = (function (ns) {
  
  
  /**
   * doesnt do anything except provoke a script load 
   * and return some stats
   * return {object} stats updated stats object
   */
  ns.provoke = function (package) {
    return Pull.getDataFor ( Goth.getToken('cloudvision'), package);
  };
 
  /**
   * return s tokens and keys needed for pcier
   * @return {object}
   */
  ns.pickerKeys = function () {
    return {
      token:ScriptApp.getOAuthToken(),
      key:PropertiesService.getScriptProperties().getProperty('cloudvision_developerKey')
    }
  };

  return ns;
  
}) (Server || {});
