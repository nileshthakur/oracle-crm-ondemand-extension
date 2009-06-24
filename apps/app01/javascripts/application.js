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
             console.log('begin complete');
             
             var userFields = {AccountName:''};
             console.log('begin user_login');
             odlib.entityQuery('Account', userFields, function(data) {
                 console.dir(data);
             });
           },
           success: function(data, textStatus) {
               console.log('begin success');               
               console.dir(data);
               console.dir(textStatus);
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
