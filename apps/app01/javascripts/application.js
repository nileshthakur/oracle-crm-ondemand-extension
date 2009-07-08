// sandbox ourselves to guarantee we don't interfere with OnDemand platform
// JS internals
(function() {
    
// bail if we don't have our main lib
if (typeof jQuery === 'undefined') {
    alert('Custom application extension failed: jQuery not available');
    return;
}

jQuery(function($) {
    
    function $get(key) {
        return $("[id='" + key + "']")
    }
    
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
               
               if (pageName === 'ContactCallEdit') {
                   var ownerId = $get('ContactCallEditForm.Owner Id').val(); // $("[id='ContactCallEditForm.Owner Id']").val();
                   var contactPerId = $get('ContactCallEditForm.Contact Per Id').val(); //$("[id='ContactCallEditForm.Contact Per Id']").val();
                   var $objectiveInputElement = $get('ContactCallEditForm.VONDMED Call');
                   var objectiveValue = $objectiveInputElement.val();

                   var obj = {ownerId: ownerId, contactPerId: contactPerId, objectiveValue: objectiveValue};

                   console.dir(obj);
                   
                   var fields = {
                       ActivityId: '',
                       PrimaryContactId: " ='" + contactPerId "' ",
                       PrimaryContactLastName: '',
                       PrimaryContactFirstName: '',
                       Owner: '',
                       AccountId: '',
                       CallType: '',
                       PrimaryContact: '',
                       CreatedBy: '',
                       Location: '',
                       Objective: '',
                       OwnerId: " ='" + ownerId + "' ",
                       Status: '',
                       Type: '',
                       ActivitySubType: '',
                       CreatedDate: '',
                       ModifiedDate: '',
                       Date: '',
                       EndTime: ''
                   };
                   
                    odlib.activityQuery(fields, function(data) {
                        console.dir(data);
                   });
                   
               }
               
               return;               
                      
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
                    fields: {UserLoginId: '', UserId: ''}
                }
             ];
             
             /*
             jQuery.each(entities, function(index, entity) {
                 odlib.entityQuery(entity.name, entity.fields, function(data) {
                     console.log(entity.name + ' count = ' + data.length);
                 });                 
             });
             */
             
             odlib.entityQuery('Contact', {ContactFullName: '', ContactId: ''}, function(data) {
                 console.dir(data);
              });
                                     
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
             
             odlib.activityQuery(fields, function(data) {
                 alert( JSON.stringify(data) );
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
        
        console.log('end - testfn');
    };
    
    window.testfn = testfn;
    testfn();
});

})();
