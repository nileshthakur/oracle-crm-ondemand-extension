// sandbox ourselves to guarantee we don't interfere with OnDemand platform
// JS internals
(function() {
    
// bail if we don't have our main lib
if (typeof jQuery === 'undefined') {
    alert('Custom application extension failed: jQuery not available');
    return;
}

jQuery(function($) {
    console.log('begin - app01');

    // find out where we're at in OnDemand
    var pathname = window.location.pathname;
    var index = pathname.lastIndexOf('/');
    var pageName = pathname.substring(index + 1);
    
    console.log('loaded: ' + pageName);
    
    console.log('end - app01');
    
    var testfn = function() {
        var userName = 'MERCKTEST_CTE01/pfeil';
        var password = 'method00';
        
        jQuery.ajax({
           url: '/Services/Integration?command=login',
           dataType: 'xml',
           beforeSend: function(xhr) {
               xhr.setRequestHeader('UserName', userName);
               xhr.setRequestHeader('Password', password);               
           },
           complete: function(xhr, textStatus) {             
             var userFields = {AccountName:''};
             var entities = [
                {
                    name: 'Account',
                    fields: {AccountName: ''}
                },
                {
                    name: 'Contact',
                    fields: {ContactFullName: ''}
                },
                {
                    name: 'User',
                    fields: {UserLoginId: ''}
                }
             ];
             
             /*
             jQuery.each(entities, function(index, entity) {
                 odlib.entityQuery(entity.name, entity.fields, function(data) {
                     console.log(entity.name + ' count = ' + data.length);
                 });                 
             });
             */
             
             var soapAction = 'document/urn:crmondemand/ws/activity/10/2004:Activity_QueryPage';
             var soapRequest = '' +
                 '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:par="urn:crmondemand/ws/activity/10/2004" xmlns:act="urn:/crmondemand/xml/activity">' +
                 '   <soapenv:Header/>' +
                 '   <soapenv:Body>' +
                 '      <par:ActivityNWS_Activity_QueryPage_Input>' +
                 '         <par:PageSize>100</par:PageSize>' +
                 '         <act:ListOfActivity>' +
                 '            <act:Activity>' +
                 '               <act:ActivityId></act:ActivityId>' +
                 '            </act:Activity>' +
                 '         </act:ListOfActivity>' +
                 '         <par:StartRowNum>0</par:StartRowNum>' +
                 '      </par:ActivityNWS_Activity_QueryPage_Input>' +
                 '   </soapenv:Body>' +
                 '</soapenv:Envelope>';
             
             odlib.manualQuery('Activity', soapAction, soapRequest, function(data) {
                 console.dir(data);
             });
             
           },
           success: function(data, textStatus) {
           }
        });
    
        // odlib.user_login(userName, password, function() {
        //     var userFields = ['FirstName', 'LastName'];
        //     console.log('begin user_login');
        //     odlib.query_user(userFields, function(data) {
        //         console.dir(data);
        //     });
        //     console.log('end user_login');        
        // });
    };
    
    window.testfn = testfn;
    testfn();
});

})();
