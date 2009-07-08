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
    
    // ContactCallDetail
    
    if (pageName === 'ContactCallDetail') {

        var valueLabel = $( $("td:contains('Objective')")[1] ).next();
        
        // TODO: implement objective exists logic
        var currentCallObjectiveExists = $.trim( valueLabel.text() ) !== '';
        
        if (!currentCallObjectiveExists) {
        
            // autopopulate Objective with previous call objective

            valueLabel.mouseover();
            valueLabel.click();
            var inlineEditor = jQuery('.iled');
            inlineEditor.val((new Date()).toString() + ': last objective' );
            var okButton = inlineEditor.parent().next().children().get(0);
            okButton.click();
            valueLabel.mouseout();
        
        }
    }
    
    console.log('loaded: ' + pageName);
    
    console.log('end - app01');
    
    var testfn = function() {
        console.log('begin - testfn');
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
                    fields: {ContactFullName: '', ContactId: ''}
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
             
             console.log('before - odlib.entityQuery');
             odlib.entityQuery('Contact', {ContactFullName: '', ContactId: ''}, function(data) {
                 alert('Retrieved ' + data.length + ' Contact records');
                 console.dir(data);
              });
                        
             
             var soapAction = 'document/urn:crmondemand/ws/activity/10/2004:Activity_QueryPage';
             var soapRequestTemplate = '' +
                 '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
                 '   <soapenv:Header/>' +
                 '   <soapenv:Body>' +
                 '      <ActivityNWS_Activity_QueryPage_Input xmlns="urn:crmondemand/ws/activity/10/2004">' +
                 '         <PageSize>100</PageSize>' +
                 '         <ListOfActivity>' +
                 '            <Activity>' +
                 '               <%=fields%>' +
                 '            </Activity>' +
                 '         </ListOfActivity>' +
                 '         <StartRowNum>0</StartRowNum>' +
                 '      </ActivityNWS_Activity_QueryPage_Input>' +
                 '   </soapenv:Body>' +
                 '</soapenv:Envelope>';
             
             var fields = {
                 ActivityId: '',
                 PrimaryContactId: " ='AAPA-2GC5M7' ",
                 PrimaryContactLastName: '',
                 PrimaryContactFirstName: '',
                 Owner: '',
                 AccountId: '',
                 CallType: '',
                 PrimaryContact: '',
                 CreatedBy: '',
                 Location: '',
                 Objective: '',
                 OwnerId: " ='AAPA-2GC5WR' ",
                 Status: '',
                 Type: '',
                 ActivitySubType: '',
                 CreatedDate: '',
                 ModifiedDate: '',
                 Date: '',
                 EndTime: ''
             };
             
             /*
             odlib.manualQuery('Activity', fields, soapAction, soapRequestTemplate, function(data) {
                 console.dir(data);
                 alert('retrieved ' + data.length + ' Activity records');
             });
             */
             
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
        
        console.log('end - testfn');
    };
    
    window.testfn = testfn;
    testfn();
});

})();
