var App = (function (ns) {
 
  // static for use on both client and server
  ns.globals = {
    result:null,
    styles: {
      image: {
        width:"100px",
        height:"auto"
      }
    },
    features: {
      scales: {
        "VERY_LIKELY":1, 
        "VERY_UNLIKELY":0,
        "POSSIBLE":0.5,
        "LIKELY":0.75,
        "UNLIKELY":0.25
      },
      "FACE_DETECTION":{
        scale:function (value) {
          var r = ns.globals.features.scales[value];
          if (typeof r === typeof undefined) {
            throw 'unexpected scale value ' + value;
          }
          return r;
        },
        filter: function (ob,key) {
           return typeof ob[key] !== 'object' && key.indexOf('hood')!==-1;
        }
      }, 
      "LABEL_DETECTION": {
        filter: function (ob,key) {
           return true;
        },
        scale:function (value) {
          return 1;
        }
      }
    }
  };
  
  // for use on client side.
  ns.init = function () {
    ns.globals.divs = {
      folderId:document.getElementById('folderid'),
      maxResponses:document.getElementById('maxresponses'),
      feature:document.getElementById('feature'),
      go:document.getElementById('go'),
      message:document.getElementById('message'),
      report:document.getElementById('report'),
      control:document.getElementById('control'),
      render:document.getElementById('render'),
      reset:document.getElementById('reset'),
      getFolder:document.getElementById('getfolder'),
      folderLabel:document.getElementById('folderlabel')
    };
    
    ns.listeners();

  };
  
  /**
  * report a message
  * @param {string} message the message
  * @param {boolean} [append=false] whether to append
  */
  ns.reportMessage = function (message,append) {
    ns.globals.divs.message.innerHTML = (append ?  ns.globals.divs.message.innerHTML : '' ) +message;
  };
  
  /** 
   * add listeners
   */
  ns.listeners = function () {
    
    /**
    * just a shortener to add these events
    * if the element exists
    */
    function listen (element , what , func ) {
      if (element) {
        element.addEventListener ( what , func , false);
      }
    }
    
    // handle a picker to get a different folder
    listen (ns.globals.divs.getFolder , "click" , function (e) {
      
      // first get the token and the developer key from the server
      Client.getPickerKeys (function (keys) {
        
        // then do a picker, passing them
        Picker.getFolderPicker (keys.token, keys.key , function (pickerData) {
          
          // couple of shortcuts
          var p = google.picker;
          var g = ns.globals.divs;
          
          // see if we got something picked;
          if (pickerData[p.Response.ACTION] === p.Action.PICKED) {
            // the first one
            var folder = pickerData[p.Response.DOCUMENTS][0];
            
            // show what was picked
            g.folderId.value = folder[p.Document.ID];
            g.folderLabel.innerHTML = folder[p.Document.NAME] + ' (' + folder[p.Document.ID] + ')';
          }
    
        }); 
      });
      
    });

    listen(ns.globals.divs.go,"click", function (e) {
      Client.provoke();
    });
    
    listen(ns.globals.divs.reset,"click", function (e) {
      Render.hide (ns.globals.divs.render,true);
      Render.hide (ns.globals.divs.control,false);
    });
    
  };
  
  return ns;
  
}) (App || {});
