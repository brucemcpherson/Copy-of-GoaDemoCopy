function oneOffSetting() { 
  
  // used by all using this script
  var propertyStore = PropertiesService.getScriptProperties();
 
  // service account for cloud vision
  cGoa.GoaApp.setPackage (propertyStore , 
    cGoa.GoaApp.createServiceAccount (DriveApp , {
      packageName: 'cloudvision_serviceaccount',
      fileId:'0B92ExLh4POiZX1M2S3hMWXkzNXM',
      scopes : cGoa.GoaApp.scopesGoogleExpand (['cloud-platform']),
      service:'google_service'
    }));
  
  // web account for cloud vision - taken from downloaded credentials
  cGoa.GoaApp.setPackage (propertyStore , 
    cGoa.GoaApp.createPackageFromFile (DriveApp , {
      packageName: 'cloudvision',
      fileId:'0B92ExLh4POiZUjIzbXFreTVPdjQ',
      scopes : cGoa.GoaApp.scopesGoogleExpand (['cloud-platform']),
      service:'google'
    }));
    
}