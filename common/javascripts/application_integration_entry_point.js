<!-- the contents of this file should be added as an "Action Bar" Custom Web applet -->
<script id='application_integration_entry_point' type='text/javascript'>

(function() {
    // remove UI container so we are not visible
    document.getElementById('application_integration_entry_point').parentNode.previousSibling.style.cssText = 'display: none';
    
    // check if we need to add any plugin code based on the URL we're at
    // this ensures we don't load any extra code unitl we need to (minimal performance impact)
    var invokeOnURLPatterns = [
        /ContactCallInsert/ig
    ];
    
    var pathname = window.location.pathname;
    
    var applyPlugins = false;
    for (var i = 0; i < invokeOnURLPatterns.length; i++) {
        var pattern = invokeOnURLPatterns[i];
        applyPlugins |= (pathname.match(pattern) !== null);
    }
    
    // no plugins match so return
    if (!applyPlugins) {
        return;
    }
    
    // used to prevent browser caching of .js file with main application logic
    var randomNumber = Math.floor( Math.random() * 999999 );
    var scriptURL = 'http://github.com/pfeilbr/oracle-crm-ondemand-extension/raw/master/common/javascripts/application_loader.js' + '?' + randomNumber;
    var headElement = document.getElementsByTagName("head")[0];         
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = scriptURL;
    scriptElement.onload = function() {};
    headElement.appendChild(scriptElement);
    
    var ssotoken = '%%%SSO Token%%%'; 
})();

</script>