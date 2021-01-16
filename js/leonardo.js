/*function setHeight() {	
	divHeight = window.innerHeight;	
	document.getElementById("main-container").style.height = divHeight + 'px';
}*/

window.onload = main();

function main() {

	var canvasOrig = document.getElementById("original-image");
	var canvasCopy = document.getElementById("copy-image");
	const canvasHeight = canvasOrig.parentElement.clientHeight;
	const canvasWidth = canvasOrig.parentElement.clientWidth;
	canvasOrig.width = canvasWidth;
	canvasOrig.height = canvasHeight;
	canvasCopy.width = canvasWidth;
	canvasCopy.height = canvasHeight;

	var ctxOrig = canvasOrig.getContext("2d");
	var ctxCopy = canvasCopy.getContext("2d");

	var imageOrig = new Image();
	imageOrig.onload = function() {
		resizeCanvasToImg(canvasOrig, imageOrig);
		ctxOrig.drawImage(imageOrig, 0, 0);
	};
	var imageCopy = new Image();
	imageCopy.onload = function() {
		resizeCanvasToImg(canvasCopy, imageCopy);
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
	changeOpacity(canvasCopy);
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


function changeOpacity(canvasCopy) {
	const opacityInput = document.getElementById('opacity');
	opacityInput.value = 0.5;
	canvasCopy.opacity = opacityInput.value;
	opacityInput.addEventListener('input', function(e) {
		const newOpacity = e.target.value;
		canvasCopy.style.opacity = newOpacity;
	});

}

function resizeCanvasToImg(canvas, image) {
	canvas.width = image.width;
	canvas.height = image.height;
}
