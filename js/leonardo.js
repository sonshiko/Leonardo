/*function setHeight() {	
	divHeight = window.innerHeight;	
	document.getElementById("main-container").style.height = divHeight + 'px';
}*/

// import getCanvasMousePosition from '@codewell/get-canvas-mouse-position';
// import resizeCanvas from 'resize-canvas';
//
// resizeCanvas({
// 	canvas: canvas,
// 	size: [100, 50] // absolute size adjustment
// })

const plagiart = {


	init() {
		window.onload = this.main();

	},

	main() {

		this.canvasOrig = document.getElementById("original-image");
		this.canvasCopy = document.getElementById("copy-image");
		this.canvasHeight = this.canvasOrig.parentElement.clientHeight;
		this.canvasWidth = this.canvasOrig.parentElement.clientWidth;
		this.canvasOrig.width = this.canvasWidth;
		this.canvasOrig.height = this.canvasHeight;
		this.canvasCopy.width = this.canvasWidth;
		this.canvasCopy.height = this.canvasHeight;
		this.moveUp = document.getElementById('Up');
		this.moveLeft = document.getElementById('Left');
		this.moveBottom = document.getElementById('Bottom');
		this.moveRight = document.getElementById('Right');
		this.inputHeight = document.getElementById('canvasHeight');
		this.inputWidth = document.getElementById('canvasWidth');
		this.origImgHeight;
		this.origImgWidth;
		var ctxOrig = this.canvasOrig.getContext("2d");
		var ctxCopy = this.canvasCopy.getContext("2d");

		var imageOrig = new Image();
		imageOrig.onload = function() {
			plagiart.resizeCanvasToImg(plagiart.canvasOrig, imageOrig);
			plagiart.origImgHeight = imageOrig.height;
			plagiart.origImgWidth = imageOrig.width;
			plagiart.inputHeight.removeAttribute('disabled');
			plagiart.inputHeight.value = 0;
			plagiart.inputWidth.removeAttribute('disabled');
			plagiart.inputWidth.value = 0;
			ctxOrig.drawImage(imageOrig, 0, 0);
		};
		var imageCopy = new Image();
		imageCopy.onload = function() {
			plagiart.resizeCanvasToImg(plagiart.canvasCopy, imageCopy);
			ctxCopy.drawImage(imageCopy, 0, 0);
		};

		this.switchSidebar();

		let originalInput = document.getElementById('original');
		originalInput.addEventListener('change', function() {
			if (this.files && this.files[0]) {
				plagiart.readFile('original', imageOrig, this.files[0])
			}
		});

		let copyInput = document.getElementById('copy');
		copyInput.addEventListener('change', function() {
			if (this.files && this.files[0]) {
				plagiart.readFile('copy', imageCopy, this.files[0])
			}
		});
		this.changeOpacity(this.canvasCopy);
		this.changeScale(this.canvasCopy);
		// this.trackMouse(this.canvasCopy);

		this.moveUp.addEventListener('click', function () {
			plagiart.moveCopy('up');
		});

		this.moveLeft.addEventListener('click', function () {
			plagiart.moveCopy('left');
		})

		this.moveBottom.addEventListener('click', function () {
			plagiart.moveCopy('bottom');
		})

		this.moveRight.addEventListener('click', function () {
			plagiart.moveCopy('right');
		})

		this.inputHeight.addEventListener('keyup', function () {
			plagiart.inputWidth.value = this.value  * plagiart.origImgWidth / plagiart.origImgHeight;
		})

		this.inputWidth.addEventListener('keyup', function () {
			plagiart.inputHeight.value = this.value  * plagiart.origImgHeight / plagiart.origImgWidth;
		})

		this.canvasOrig.addEventListener('click', function (event) {
			const canvas = event.target;
			const rect = canvas.getBoundingClientRect();
			const coords = {
				x: event.clientX - rect.x,
				y: event.clientY - rect.y,
			};
			console.log(coords);
		})
		this.mode = 'scale';
		this.modeInputs = document.getElementsByClassName('mode');
		for( let i =0; i< this.modeInputs.length; i++) {
			this.modeInputs[i].addEventListener('change', function(event) {
				// todo add class to main and andd logic to change modes by it class
				if (plagiart.mode === 'scale') {
					plagiart.mode = 'compare';
					document.getElementById('copy-wrapper').classList.remove('hidden');
				} else {
					plagiart.mode = 'scale';
					document.getElementById('copy-wrapper').classList.add('hidden');
				}
			})
		}
	},

	readFile(imgType, imgSource, targetFile) {
		var FR= new FileReader();

		FR.addEventListener("load", function(e) {
			if (imgType === 'original') {
				imgSource.src = e.target.result;
			} else {
				imgSource.src = e.target.result;
			}
		});

		FR.readAsDataURL( targetFile );

	},

	switchSidebar() {
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
	},


	changeOpacity(canvasCopy) {
		const opacityInput = document.getElementById('opacity');
		opacityInput.value = 0.5;
		plagiart.canvasCopy.style.opacity = 0.5;
		opacityInput.addEventListener('input', function(e) {
			const newOpacity = e.target.value;
			plagiart.canvasCopy.style.opacity = newOpacity;
		});

	},

	changeScale(canvasCopy) {
		const scaleInput = document.getElementById('scale');
		scaleInput.value = 100;
		this.canvasCopy.style.transform = `scale(${scaleInput.value/100})`;
		scaleInput.addEventListener('input', function(e) {
			const newScale = e.target.value;
			plagiart.canvasCopy.style.transform =`scale(${newScale/100})`;
		});

	},

	resizeCanvasToImg(canvas, image) {
		canvas.width = image.width;
		canvas.height = image.height;

	},

	moveCopy(direction) {
		const copyWrapper = document.getElementById('copy-wrapper');
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
		}

		function moveCopy(step, dataDirection) {
			let transformVProperty = (copyWrapper.getAttribute('data-vertical') === null) ? 0 : parseInt(copyWrapper.getAttribute('data-vertical'));
			let transformHProperty = (copyWrapper.getAttribute('data-horizontal') === null) ? 0 : parseInt(copyWrapper.getAttribute('data-horizontal'));

			if (dataDirection === 'data-horizontal') {
				transformHProperty += step;
				copyWrapper.setAttribute('data-horizontal', transformHProperty);
			} else {
				transformVProperty += step;
				copyWrapper.setAttribute('data-vertical', transformVProperty);
			}
			const shiftY = 'translateY(' + transformVProperty + 'px)';
			const shiftX = 'translateX(' + transformHProperty + 'px)';
			copyWrapper.style.transform = shiftX + ' ' + shiftY;
		}
	}

}

plagiart.init();

const plagiart2 = new Object(plagiart);