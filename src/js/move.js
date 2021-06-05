function moveCanvas(direction, target) {
    let wrapper = document.getElementById('original-wrapper');
    if (target === 'copy') {
        wrapper = document.getElementById('copy-wrapper');
    }
    const step = 2;
    switch (direction) {
        case 'up':
            moveCopy(-step, 'data-vertical');
            break;
        case 'left':
            moveCopy(-step, 'data-horizontal');
            break;
        case 'bottom':
            moveCopy(step, 'data-vertical');
            break;
        case 'right':
            moveCopy(step, 'data-horizontal');
            break;
        case 'mirror':
            moveCopy(step, 'mirror');
            break;
        case 'rotate90':
            moveCopy(step, 'rotate90');
            break;
        case 'rotate1':
            moveCopy(step, 'rotate1');
            break;
        case 'rotate-90':
            moveCopy(step, 'rotate-90');
            break;
        case 'rotate-1':
            moveCopy(step, 'rotate-1');
            break;
    }

    function moveCopy(step, dataDirection) {
        let transformVProperty = (wrapper.getAttribute('data-vertical') === null) ? 0 : parseInt(wrapper.getAttribute('data-vertical'));
        let transformHProperty = (wrapper.getAttribute('data-horizontal') === null) ? 0 : parseInt(wrapper.getAttribute('data-horizontal'));
        let transform3DProperty = (wrapper.getAttribute('data-mirror') === null) ? 0 : parseInt(wrapper.getAttribute('data-mirror'));
        let transform2DProperty = (wrapper.getAttribute('data-rotate') === null) ? 0 : parseInt(wrapper.getAttribute('data-rotate'));
        //
        const imgRotationState = transform3DProperty === 0 ? 1 : -1;
        switch (dataDirection) {
            case 'data-horizontal':
                transformHProperty += step;
                wrapper.setAttribute('data-horizontal', transformHProperty);
                break;
            case 'data-vertical':
                transformVProperty += step;
                wrapper.setAttribute('data-vertical', transformVProperty);
                break;
            case 'mirror':
                transform3DProperty = (transform3DProperty === 180 ? 0 : 180);
                wrapper.setAttribute('data-mirror', transform3DProperty);
                break;
            case 'rotate90':
                transform2DProperty = transform2DProperty + 90 * imgRotationState;
                wrapper.setAttribute('data-rotate', transform2DProperty);
                break;
            case 'rotate1':
                transform2DProperty = transform2DProperty + 1 * imgRotationState;
                wrapper.setAttribute('data-rotate', transform2DProperty);
                break;
            case 'rotate-90':
                transform2DProperty = transform2DProperty - 90 * imgRotationState;
                wrapper.setAttribute('data-rotate', transform2DProperty);
                break;
            case 'rotate-1':
                transform2DProperty = transform2DProperty - 1 * imgRotationState;
                wrapper.setAttribute('data-rotate', transform2DProperty);
                break;
        }

        const shiftY = 'translateY(' + transformVProperty + 'px)';
        const shiftX = 'translateX(' + transformHProperty + 'px)';
        const shift3D = 'rotateY(' + transform3DProperty + 'deg)';
        const shift2D = 'rotate(' + transform2DProperty + 'deg)';
        wrapper.style.transform = shiftX + ' ' + shiftY + ' ' + shift3D + ' ' + shift2D;
    }
}
