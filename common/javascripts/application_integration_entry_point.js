<!-- the contents of this file should be added as an "Action Bar" Custom Web applet -->
<script type='text/javascript'>

(function() {
    // used to prevent browser caching of .js file with main application logic
    var randomNumber = Math.floor( Math.random() * 999999 );
//    var scriptURL = 'http://github.com/pfeilbr/oracle-crm-ondemand-extension/raw/master/common/javascripts/application_loader.js' + '?' + randomNumber;
    var scriptURL = '/OnDemand/user/AccountDetailAttachment?OMCR0=AAPA-2SD5YY&OMTHD=FAView&OMTGT=FADLCtrl&FileExt=txt&OMCBO=Account&FADForm.Id=AAPA-2SD627&OMRET0=AccountDetail%3focTitle%3dSystem%26OMTGT%3dAccountDetailForm%26OMTHD%3dAccountDetailNav%26ocEdit%3dY%26AccountDetailForm.Id%3dAAPA-2SD5YY%26OCTYPE%3d%26ocTitleField%3dName&FileName=application_loader.js&RowId=AAPA-2SD627' + '?' + randomNumber;
    var headElement = document.getElementsByTagName("head")[0];         
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = scriptURL;
    scriptElement.onload = function() {};
    headElement.appendChild(scriptElement);
    
    var ssotoken = '%%%SSO Token%%%';   
})();

</script>