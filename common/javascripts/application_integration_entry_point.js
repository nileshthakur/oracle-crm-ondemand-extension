<!-- the contents of this file should be added as an "Action Bar" Custom Web applet -->
<!-- this ensures the basic libraries are loaded on every OnDemand page -->

<!-- src in firebugx to be non-ff browser friendly -->
<script type='text/javascript' src='http://fbug.googlecode.com/svn-history/r3153/lite/branches/firebug1.1/firebugx.js'></script>

<!-- src in jQuery from google -->
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'></script>

<!-- main setup logic -->
<script type='text/javascript'>

// avoid namespace collisions
jQuery.noConflict();

// page finished loading hook
jQuery(function($) {

    var appURL = function(relativePath) {
      var basePath = 'http://github.com/pfeilbr/oracle-crm-ondemand-extension/raw/master';
      return basePath + relativePath;
    };

    // used to prevent browser caching of .js file with main application logic
    var randomNumber = Math.floor( Math.random() * 999999 );
    
    // src in main application logic
    //var applicationSourceURL = 'http://ajax.googleapis.com/ajax/libs/ext-core/3.0.0/ext-core.js';
    var applicationSourceURL = appURL('/apps/app01/javascripts/application.js');
    var nonCacheableApplicationSourceURL = applicationSourceURL + '?' + randomNumber;
  
    // load app src dynamically to avoid browser caching  
    $.getScript(nonCacheableApplicationSourceURL, function() {
        console.log('finished loading: ' + nonCacheableApplicationSourceURL);
    });

    // global injection test
    if (typeof console !== 'undefined') {
        console.log('Hello firebug console!');
        console.log('SSO Token = %%%SSO Token%%%');
        console.log('$ = ' + $);
    }
});

</script>