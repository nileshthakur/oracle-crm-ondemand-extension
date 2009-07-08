<!-- the contents of this file should be added as an "Action Bar" Custom Web applet -->
<script type='text/javascript'>

(function() {
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