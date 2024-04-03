document.addEventListener('DOMContentLoaded', function() {
    let collapseButton = document.getElementById('collapse-button');
    let collapsed, name, value;
    let now = new Date();
    let expirationDate = new Date();
    expirationDate.setFullYear(now.getFullYear() + 10);

    if (collapseButton) {
        collapseButton.addEventListener('click', function() {
            
            collapsed = collapseButton.getAttribute('aria-expanded');
            name = 'wp_navbar_collapsed';
            value = collapsed == "true" ? 'collapsed' : 'expanded';                                    
            document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
 
        });
    }
});
