var Pull = (function (ns) {
  
  /**
  * do the general analysis
  * @param {string} accessToken the accessToken
  * @param {string} folderId the folder id with the images
  * @param {string} type the type of feature
  * @param {number} maxResults max number of results
  * @return {object} the  result
  */
  ns.get = function (accessToken, folderId , type , maxResults) {

    return cloudVisionAnnonate (
      accessToken, folderId, 
      type , maxResults,10
    );
  };
  
  /**
  * get data and change it around depending on the type of request
  * @param {string} accessToken the token to use
  * @param {number} package the options
  * @return {object} the  result
  */
  ns.getDataFor = function (accessToken, package) {
    // do the analysis

    var results = Pull.get ( accessToken, 
       package.folderId, package.feature, package.maxResponses
    );
    
    // sort out the data for the type of feature
    var data = results.map(function(d) {
      return {
        rows:(!Object.keys(d.annotation).length ? [] : d.annotation[Object.keys(d.annotation)[0]]).map(function(e) { 
          return Object.keys(e).filter(function(k) {
            // filter out some of the returned data
            return App.globals.features[package.feature].filter(e,k) ;
          }) 
          .reduce (function (p,c) {
            p[c] = e[c];
            return p;
          },{});
        }),
        file:d.file
      }
    });
    
    var headings = data.length && data[0].rows.length ? Object.keys(data[0].rows[0]) : [];
    
    // work out scaled values
    // this takes the average of each row after scaling
    data.forEach(function(item){
      item.scales = headings.reduce(function(p,c) {
        p[c.replace('Likelihood','')] = item.rows.reduce(function(ip,ic) {
          return ip + App.globals.features[package.feature].scale(ic[c]);
        },0)/item.rows.length;
        return p;
      }, {});
    });
    
    data.forEach(function(d) {
      Logger.log(d.scales);
    });
    
    
    return {
      headings:headings,
      feature:package.feature,
      data:data
    };
  };
  
  /**
  * do the pets image analysis
  * @param {string} accessToken the accessToken
  * @param {string} folderId the folder id with the images
  * @return {object} the pets result
  */
  ns.pets = function (accessToken,folderId) {
    return ns.get (
      accessToken, folderId || '0B92ExLh4POiZYzZZT3d0aU9VV1U', 
      'LABEL_DETECTION' , 3
    );
  };
  
  /**
  * do the faces image analysis
  * @param {string} accessToken the accessToken
  * @return {object} the pets result
  */
  ns.faces = function (accessToken,folderId) {
    // some people images here
    return ns.get (
      accessToken, folderId || '0B92ExLh4POiZZDNKcVN0QTJJMGs', 
      'FACE_DETECTION' , 1
    );
    
  };
  
  return ns;
})({});