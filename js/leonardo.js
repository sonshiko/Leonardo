/*function setHeight() {	
	divHeight = window.innerHeight;	
	document.getElementById("main-container").style.height = divHeight + 'px';
}*/

window.onload = main();

function main() {
	
	
	var canvasOrig = document.getElementById("original-image");
	var canvasCopy = document.getElementById("copy-image");
	var ctxOrig = canvasOrig.getContext("2d");
	var ctxCopy = canvasCopy.getContext("2d");
	var imageOrig = new Image();
	imageOrig.onload = function() {
		ctxOrig.drawImage(imageOrig, 0, 0);
	};
	var imageCopy = new Image();
	imageCopy.onload = function() {
		ctxCopy.drawImage(imageCopy, 0, 0);
	};

	switchSidebar();

	let originalInput = document.getElementById('original');
	originalInput.addEventListener('change', function() {
		if (this.files && this.files[0]) {
			readFile('original', imageOrig, this.files[0])
		}
	});

	let copyInput = document.getElementById('copy');
	copyInput.addEventListener('change', function() {
		if (this.files && this.files[0]) {
			readFile('copy', imageCopy, this.files[0])
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

function switchSidebar() {
	let switchSidebarBtn = document.getElementById('sidebar-position');
	let sidebarPosition = 'right';
	let documentWrapper = document.getElementById('main-container');
	switchSidebarBtn.addEventListener('click', function() {
		if (sidebarPosition === 'right') {
			sidebarPosition = 'left';
			document.getElementById('sidebar-position').innerHTML = "Sidebar right";
		} else {
			sidebarPosition = 'right';
			document.getElementById('sidebar-position').innerHTML = "Sidebar left";
		}
		documentWrapper.classList.toggle('wrapper-reverse');
	})
}

function canvasInit() {

}

