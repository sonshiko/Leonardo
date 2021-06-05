

function uploadPicture(elementId, imgSource ) {
    let currentInput = document.getElementById(elementId);
    currentInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            readFile(elementId, imgSource, this.files[0])
        }
    });
}

function readFile(imgType, imgSource, targetFile) {
    var FR= new FileReader();

    FR.addEventListener("load", function(e) {
        if (imgType === 'original') {
            imgSource.src = e.target.result;
        } else {
            imgSource.src = e.target.result;
        }
    });

    FR.readAsDataURL( targetFile );

}
