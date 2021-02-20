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


	init(wrapperId) {
		window.onload = this.main(wrapperId);
	},

	main(wrapperid) {
		this.createHtml(wrapperid);
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

		let copyInput = document.getElementById('clone');
		copyInput.addEventListener('change', function() {
			if (this.files && this.files[0]) {
				plagiart.readFile('clone', imageCopy, this.files[0])
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
				width: plagiart.inputWidth.value == 0 ? rect.width : plagiart.inputWidth.value,
				height: plagiart.inputHeight.value == 0 ? rect.height : plagiart.inputHeight.value
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
				console.log('mode ', plagiart.mode);
				if (plagiart.mode === 'scale') {
					plagiart.mode = 'compare';
					wrapper.classList.remove('scale-mode');
					wrapper.classList.add('compare-mode');
				} else {
					plagiart.mode = 'scale';
					wrapper.classList.remove('compare-mode');
					wrapper.classList.add('scale-mode');
				}
				console.log('mode ', plagiart.mode);
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
	},

	createHtml(wrapperid) {
		const content =`
			<!-- Begin of header -->
			<header class="header">
				<div>
					<button class="btn" id="sidebar-position">
						Sidebar left
					</button>
					<div>
						<label>
							Scale mode <input type="radio" id="scaleMode" class="mode" name="mode" checked>
						</label>
						<label>
							<input type="radio" id="compareMode" name="mode" class="mode"> Compare mode
						</label>
					</div>

				</div>
			</header>
		<!-- End of header -->
		<!-- Main -->
		<main class="main">
			<!-- -->
			<div id="main-container" class="wrapper">
				<!-- The area to load pictures -->
				<div class="img-holder wrapper-inner">
					<div class="canvas-wrapper" id="original-wrapper">
						<canvas id="original-image" class="original-image"></canvas>
					</div>
					<div class="canvas-wrapper compare-mode__element" id="copy-wrapper">
						<canvas id="copy-image"
								class="copy-image"></canvas>
					</div>
				</div>
				<!-- Right-side area with interface -->
				<ul class="wrapper-inner panel-list controll-panel">
					<li><b>Control Panel</b></li>
					<li class="panel-item">
						<!-- <button id="originalPicture" class="buttons" type="button">Load the original picture</button> -->
						<figure>
							<img id="originalPicture" class="buttons" src="img/button-orig.jpg" alt="Press this button to load original picture">
								<figcaption>Original picture</figcaption>
						</figure>
						<label for="original" class="input-label btn full-width-btn">
							Upload image
							<input type="file"
								   id="original" name="original"
								   placeholder="Original file"
								   accept="image/png, image/jpeg">
						</label>
					</li>
					<li class="panel-item compare-mode__element">
						<figure>
							<!-- <button id="artistsPicture" class="buttons" type="button">Load the your own picture</button> -->
							<img id="artistsPicture" class="buttons" src="img/button-custom.jpg" alt="Press this button to load your picture">
								<figcaption>Your picture</figcaption>
						</figure>
						<label for="clone" class="input-label btn full-width-btn">
							Upload image
							<input type="file"
								   id="clone" name="clone"
								   placeholder="Your file"
								   accept="image/png, image/jpeg">
						</label>
					</li>
					<li class="panel-item compare-mode__element">
						<label for="opacity">Opacity:</label>
						<input type="range" id="opacity" name="opacity"
							   class="input"

							   value="0.5"
							   min="0" max="1" step="0.05">
					</li>
					<li class="panel-item compare-mode__element">
						<label for="scale">Scale:</label>
						<input type="range" id="scale" name="scale"
							   class="input"
							   value="100"
							   min="0" max="100" step="1">
					</li>
					<li class="panel-item compare-mode__element">
						<div class="move-btn-wrapper">
							<div class="move-btn-container">
								<button class="btn move-btn" title="Up" id="Up"></button>
								<button class="btn move-btn" title="Right" id="Right"></button>
								<button class="btn move-btn" title="Left" id="Left"></button>
								<button class="btn move-btn" title="Bottom" id="Bottom"></button>
							</div>
						</div>
					</li>

					<li class="panel-item scale-mode__element">
						<label for="canvasWidth">
							Enter canvas Width:
							<input type="number"
								   id="canvasWidth"
								   data-input="height"
								   class="sizeInput input" value="0"
								   disabled>
						</label>
						<label for="canvasHeight">
							Enter canvas Height:
							<input type="number"
								   id="canvasHeight"
								   data-input="width"
								   class="sizeInput input"
								   value="0"
								   disabled>
						</label>
					</li>
					<li class="panel-item scale-mode__element">
						<p>Point coordinates for new canvas:</p>
						<p>By horisontal: <b id="remappedX"></b></p>
						<p>By vertical: <b id="remappedY"></b></p>
					</li>

				</ul>
			</div>
		</main>
		<!-- End of main -->

		<!-- Footer -->
		<footer class="footer">
			<div>

			</div>

		</footer>
		<!-- End of footer -->
		`;
		const wrapper = document.getElementById(wrapperid);
		wrapper.innerHTML = content;
	}

}

plagiart.init('plagiartWrapper');
