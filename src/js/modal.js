function showModal(modalId) {
    const currentModal = document.getElementById(modalId);
    currentModal.classList.add('visible');
    const wrapperToBlur = document.getElementById('plagiartWrapper');
    wrapperToBlur.classList.add('blur');
    const reloadButton = document.getElementById('reload');
    reloadButton.addEventListener('click', function () {
        window.location.reload();
    })
}
