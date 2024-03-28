document.addEventListener('DOMContentLoaded', function() {
    var collapseButton = document.getElementById('collapse-button');
    
    if (collapseButton) {
        collapseButton.addEventListener('click', function() {
            var collapsed = collapseButton.getAttribute('aria-expanded')
            console.log(collapsed, "collapsed")    
            
            
            var optionName = "wp_navbar_collapsed";
            var optionValue = collapsed;

            

        });
    }
});
