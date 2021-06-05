function switchSidebar() {
    let switchSidebarBtn = document.getElementById('sidebar-position');
    let sidebarPosition = 'right';
    let documentWrapper = document.getElementById('main-container');
    switchSidebarBtn.addEventListener('click', function() {
        if (sidebarPosition === 'right') {
            sidebarPosition = 'left';
            document.getElementById('sidebar-position').classList.remove('right');
            document.getElementById('sidebar-position').classList.add('left');
        } else {
            sidebarPosition = 'right';
            document.getElementById('sidebar-position').classList.remove('left');
            document.getElementById('sidebar-position').classList.add('right');
        }
        documentWrapper.classList.toggle('wrapper-reverse');
    })
}
