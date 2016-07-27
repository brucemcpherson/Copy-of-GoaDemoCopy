/**
 * this is how  to do a webapp which needs authentication
 * @param {*} e - parameters passed to doGet
 * @return {HtmlOurput} for rendering
 */
var HTML_FILE = 'asme' //asanother' // or asme 
function doGet (e) {
  
  // this is pattern for a WebApp.
  // passing the doGet parameters (or anything else)
  // will ensure they are preservered during the multiple oauth2 processes
      
  // get the goa for this project
  var goa = cGoa.GoaApp.createGoa(
    'cloudvision', 
    PropertiesService.getScriptProperties()
  ).execute(e);
  
  // it's possible that we need consent - this will cause a consent dialog
  if (goa.needsConsent()) {
    return goa.getConsent();
  }
  
  // if we get here its time for your webapp to run 
  // and we should have a token, or thrown an error somewhere
  if (!goa.hasToken()) { 
    throw 'something went wrong with goa - did you check if consent was needed?';
  }

  // now return the evaluated page
  return HtmlService
  .createTemplateFromFile(HTML_FILE)
  .evaluate()
  .setSandboxMode(HtmlService.SandboxMode.IFRAME)
  .setTitle('Web app Oauth2 ' + HTML_FILE)

}



