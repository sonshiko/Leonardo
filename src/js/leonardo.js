const plagiart = {


	init(wrapperId) {



		window.onload = plagiart.main(wrapperId);
	},

	main(wrapperid) {
		renderHtml(wrapperid);
		initMoveButtons();
		switchSidebar();
		initTranslate();
		this.canvasOrig = document.getElementById("original-image");
		this.canvasCopy = document.getElementById("copy-image");
		this.canvasHeight = this.canvasOrig.parentElement.clientHeight;
		this.canvasWidth = this.canvasOrig.parentElement.clientWidth;
		this.canvasOrig.width = this.canvasWidth;
		this.canvasOrig.height = this.canvasHeight;
		this.canvasCopy.width = this.canvasWidth;
		this.canvasCopy.height = this.canvasHeight;

		this.inputHeight = document.getElementById('canvasHeight');
		this.inputWidth = document.getElementById('canvasWidth');
		let ctxOrig = this.canvasOrig.getContext("2d");
		let ctxCopy = this.canvasCopy.getContext("2d");

		let imageOrig = new Image();
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
		let imageCopy = new Image();
		imageCopy.onload = function() {
			plagiart.resizeCanvasToImg(plagiart.canvasCopy, imageCopy);
			ctxCopy.drawImage(imageCopy, 0, 0);
		};

		uploadPicture('original', imageOrig);
		uploadPicture('clone', imageCopy);

		this.changeOpacity(this.canvasCopy);
		this.changeScale(this.canvasCopy, document.getElementById('scaleCopy'));
		this.changeScale(this.canvasOrig, document.getElementById('scaleOrig'));

		this.inputHeight.addEventListener('keyup', function () {
			plagiart.inputWidth.value = this.value  * plagiart.origImgWidth / plagiart.origImgHeight;
		})

		this.inputWidth.addEventListener('keyup', function () {
			plagiart.inputHeight.value = this.value  * plagiart.origImgHeight / plagiart.origImgWidth;
		})

		this.canvasOrig.addEventListener('mousemove', function (event) {
			const canvas = event.target;
			const rect = canvas.getBoundingClientRect();
			const coords = {
				x: event.clientX - rect.x,
				y: event.clientY - rect.y,
			};
			const oldCanvas = {
				width: rect.width,
				heigth: rect.height
			};
			const newCanvas = {
				width: plagiart.inputWidth.value === 0 ? rect.width : plagiart.inputWidth.value,
				height: plagiart.inputHeight.value === 0 ? rect.height : plagiart.inputHeight.value
			};
			const newCoords = {
				x: Math.round(newCanvas.width * coords.x / oldCanvas.width),
				y: Math.round(newCanvas.height * coords.y / oldCanvas.heigth)
			};

			document.getElementById('remappedX').innerText = newCoords.x;
			document.getElementById('remappedY').innerText = newCoords.y;
		})
		this.mode = 'scale';

		const wrapper = document.getElementById('plagiartWrapper');
		wrapper.classList.add('scale-mode');
		this.modeInputs = document.getElementsByClassName('mode');
		for( let i =0; i< this.modeInputs.length; i++) {
			this.modeInputs[i].addEventListener('change', function(event) {
				if (plagiart.mode === 'scale') {
					plagiart.mode = 'compare';
					wrapper.classList.remove('scale-mode');
					wrapper.classList.add('compare-mode');
				} else {
					plagiart.mode = 'scale';
					wrapper.classList.remove('compare-mode');
					wrapper.classList.add('scale-mode');
				}
			})
		}


	},


	changeOpacity(canvasCopy) {
		const opacityInput = document.getElementById('transparency');
		opacityInput.value = 50;
		canvasCopy.style.opacity = 1 - opacityInput.value / 100;
		opacityInput.addEventListener('input', function(e) {
			const newOpacity = e.target.value;
			canvasCopy.style.opacity = 1 - newOpacity / 100;
		});

	},

	changeScale(canvas, scaleInput) {
		scaleInput.value = 100;
		canvas.style.transform = `scale(${scaleInput.value/100})`;
		scaleInput.addEventListener('input', function(e) {
			const newScale = e.target.value;
			canvas.style.transform =`scale(${newScale/100})`;
		});

	},

	resizeCanvasToImg(canvas, image) {
		const  ctx = canvas.getContext("2d");
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.height, canvas.width);
		canvas.width = image.width;
		canvas.height = image.height;

	}

}

plagiart.init('plagiartWrapper');
