function initMoveButtons() {
    const buttons = [
        {dataId: 'Up', direction: 'up'},
        {dataId: 'Left', direction: 'left'},
        {dataId: 'Bottom', direction: 'bottom'},
        {dataId: 'Right', direction: 'right'},
        {dataId: 'Mirror', direction: 'mirror'},
        {dataId: 'Rotate90', direction: 'rotate90'},
        {dataId: 'Rotate-90', direction: 'rotate-90'},
        {dataId: 'Rotate1', direction: 'rotate1'},
        {dataId: 'Rotate-1', direction: 'rotate-1'},
    ];

    buttons.forEach( item => {
        const currentButtons = document.querySelectorAll('[data-id=' + item.dataId +']');
        currentButtons.forEach( function(button) {
            button.addEventListener('click', function () {
                moveCanvas(item.direction, button.getAttribute('data-target'));
            });
        })
    })
}
