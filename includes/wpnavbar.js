
document.addEventListener('DOMContentLoaded', function() {

    let brandCookie = "?page="+navBarParams.nfdbrandname;
    let urlSearchString = window.location.search;

    
    let now = new Date();
    let expirationDate = new Date();
    expirationDate.setFullYear(now.getFullYear() + 10);

    if(brandCookie == urlSearchString){
        if(getCookie('wp_navbar_collapsed') == null){
            document.cookie = 'wp_navbar_collapsed' + '=' + encodeURIComponent('collapsed') + '; expires=' + expirationDate.toUTCString() + '; path=/';
            document.body.classList.add("folded");
        }
        else if(getCookie('wp_navbar_collapsed') == "collapsed"){
            document.body.classList.add("folded");
        }else{
            document.body.classList.remove("folded");
        }
    }
    else{
        if(getCookie('wp_navbar_collapsed') == null){
            document.body.classList.remove("folded");
        }
    }

    let collapseButton = document.getElementById('collapse-button');
    let collapsed, name, value;

    if (collapseButton) {
        collapseButton.addEventListener('click', function() {
            
            collapsed = collapseButton.getAttribute('aria-expanded');
            name = 'wp_navbar_collapsed';
            value = collapsed == "true" ? 'collapsed' : 'expanded';                                    
            document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
 
        });
    }
});


function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    let cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}