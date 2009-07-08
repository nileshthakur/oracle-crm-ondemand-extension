<!-- the contents of this file should be added as an "Action Bar" Custom Web applet -->
<!-- this ensures the basic libraries are loaded on every OnDemand page -->

<!-- src in firebugx to be non-ff browser friendly -->
<script type='text/javascript' src='http://fbug.googlecode.com/svn-history/r3153/lite/branches/firebug1.1/firebugx.js'></script>

<!-- src in jQuery from google -->
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'></script>

<!-- main setup logic -->
<script type='text/javascript'>

(function() {

    // used to prevent browser caching of .js file with main application logic
    var randomNumber = Math.floor( Math.random() * 999999 );

    // URL builder helper
    function appURL(relativePath) {
      var basePath = 'http://github.com/pfeilbr/oracle-crm-ondemand-extension/raw/master';
      return basePath + relativePath;
    }

    var scriptDefinitions = [
        {
            name: 'firebugx',
            url: 'http://fbug.googlecode.com/svn-history/r3153/lite/branches/firebug1.1/firebugx.js',
            callback: function(scriptDefinition) { console.log('loaded ' + scriptDefinition.name);  }
        },
        {
            name: 'jquery',
            url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js',
            callback: function() { jQuery.noConflict(); }
        },
        {
            name: 'ondemand - common',
            url: appURL("/common/javascripts/ondemand_common.js") + '?' + randomNumber
        },
        {
            name: 'application',
            url: appURL('/apps/app01/javascripts/application.js') + '?' + randomNumber
        }
    ];
    
    function loadScripts(scripts) {
    
        if (typeof scripts !== 'object') {
            alert('loadScripts(scripts) without array argument');
        }
    
        if (scripts.length === 0) {
            return;
        }
        
        var scriptDefinition = scripts.shift();
    
        var headElement = document.getElementsByTagName("head")[0];         
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = scriptDefinition.url;
        scriptElement.onload = function() {
            
            // execute callback function
            if (typeof scriptDefinition.callback === 'function') {
                scriptDefinition.callback.call(this, scriptDefinition);    
            }
            
            // load the rest (tail of array) of the scripts
            loadScripts(scripts);
        };

        headElement.appendChild(scriptElement);    
    }

    loadScripts(scriptDefinitions);

})();

// avoid namespace collisions
jQuery.noConflict();

// page finished loading hook
jQuery(function($) {

    // URL builder helper
    var appURL = function(relativePath) {
      var basePath = 'http://github.com/pfeilbr/oracle-crm-ondemand-extension/raw/master';
      return basePath + relativePath;
    };

    // used to prevent browser caching of .js file with main application logic
    var randomNumber = Math.floor( Math.random() * 999999 );
    
    // src in ondemand common library
    var ondemandLibraryURL = appURL("/common/javascripts/ondemand_common.js");
    var nonCacheableOndemandLibraryURL = ondemandLibraryURL + '?' + randomNumber;
    
    // src in main application logic
    //var applicationSourceURL = 'http://ajax.googleapis.com/ajax/libs/ext-core/3.0.0/ext-core.js';
    var applicationSourceURL = appURL('/apps/app01/javascripts/application.js');
    var nonCacheableApplicationSourceURL = applicationSourceURL + '?' + randomNumber;

    // load ondemand common library dynamicall to avoid browser caching
    $.getScript(nonCacheableOndemandLibraryURL, function() {
       console.log('finished loading: ' + nonCacheableOndemandLibraryURL);
       
       if (window.odlib) {
           window.odlib.ssotoken = '%%%SSO Token%%%';
       }
       
       // load app src dynamically to avoid browser caching  
       $.getScript(nonCacheableApplicationSourceURL, function() {
           console.log('finished loading: ' + nonCacheableApplicationSourceURL);
       });

    });
  
    // global injection test
    if (typeof console !== 'undefined') {
        console.log('Hello firebug console!');
        console.log('SSO Token = %%%SSO Token%%%');
        console.log('$ = ' + $);
    }
});

</script>