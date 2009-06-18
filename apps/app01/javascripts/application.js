// bail if we don't have our main lib
if (typeof jQuery === 'undefined') {
    alert('Custom application extension failed: jQuery not available');
    return;
}

jQuery(function($) {
    console.log('page loaded');
    console.log('begin - app01');
    console.log('app01 logic loaded!');
    console.log('end - app01');    
});
