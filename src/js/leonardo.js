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

const languagesSet = JSON.parse(`{
  "place_sidebar_left": {
    "en": "Place Sidebar Left",
    "uk": "Перемістити ліворуч"
  },
  "place_sidebar_right": {
    "en": "Place Sidebar Right",
    "uk": "Перемістити праворуч"
  }
}`);

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

		// this.moveUp = document.getElementById('Up');
		// this.moveLeft = document.getElementById('Left');
		// this.moveBottom = document.getElementById('Bottom');
		// this.moveRight = document.getElementById('Right');


		this.moveUp = document.querySelectorAll('[data-id="Up"]');
		this.moveLeft = document.querySelectorAll('[data-id="Left"]');
		this.moveBottom = document.querySelectorAll('[data-id="Bottom"]');
		this.moveRight = document.querySelectorAll('[data-id="Right"]');
		this.mirror = document.querySelectorAll('[data-id="Mirror"]');
		this.rotate90 = document.querySelectorAll('[data-id="Rotate90"]');
		this.rotate1 = document.querySelectorAll('[data-id="Rotate1"]');
		this.rotate_90 = document.querySelectorAll('[data-id="Rotate-90"]');
		this.rotate_1 = document.querySelectorAll('[data-id="Rotate-1"]');

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
		this.changeScale(this.canvasCopy, document.getElementById('scaleCopy'));
		this.changeScale(this.canvasOrig, document.getElementById('scaleOrig'));
		// this.trackMouse(this.canvasCopy);

		this.moveUp.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('up', button.getAttribute('data-target'));
			});
		})

		this.moveLeft.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('left', button.getAttribute('data-target'));
			});
		})

		this.moveBottom.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('bottom', button.getAttribute('data-target'));
			});
		})

		this.moveRight.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('right', button.getAttribute('data-target'));
			});
		});

		this.mirror.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('mirror', button.getAttribute('data-target'));
			});
		});

		this.rotate90.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('rotate90', button.getAttribute('data-target'));
			});
		});

		this.rotate1.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('rotate1', button.getAttribute('data-target'));
			});
		});

		this.rotate_90.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('rotate-90', button.getAttribute('data-target'));
			});
		});

		this.rotate_1.forEach( function(button) {
			button.addEventListener('click', function () {
				plagiart.moveCopy('rotate-1', button.getAttribute('data-target'));
			});
		});

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
		this.language = 'uk';
		this.translate();
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

		this.languageInputs = document.getElementsByClassName('language');
		for( let i =0; i< this.languageInputs.length; i++) {
			this.languageInputs[i].addEventListener('change', function(event) {
				if (plagiart.language === 'uk') {
					plagiart.language = 'en';
				} else {
					plagiart.language = 'uk';
				}
				plagiart.translate();
			})
		}

		// this.loadJson();
	},

	translate() {
		const language = this.language;
		const langSet = languagesSet;
		const elementsToTranslate = document.querySelectorAll('[data-translate]');
		elementsToTranslate.forEach( element => {
			const translationKey = element.getAttribute('data-translate');
			element.innerHTML = langSet[translationKey][language];
		});
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
				document.getElementById('sidebar-position').classList.remove('right');
				document.getElementById('sidebar-position').classList.add('left');
			} else {
				sidebarPosition = 'right';
				document.getElementById('sidebar-position').classList.remove('left');
				document.getElementById('sidebar-position').classList.add('right');
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

	},

	moveCopy(direction, target) {
		let wrapper = document.getElementById('original-wrapper');
		if (target === 'copy') {
			wrapper = document.getElementById('copy-wrapper');
		};
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
					transform2DProperty = transform2DProperty + 90;
					wrapper.setAttribute('data-rotate', transform2DProperty);
					break;
				case 'rotate1':
					transform2DProperty = transform2DProperty + 1;
					wrapper.setAttribute('data-rotate', transform2DProperty);
					break;
				case 'rotate-90':
					transform2DProperty = transform2DProperty - 90;
					wrapper.setAttribute('data-rotate', transform2DProperty);
					break;
				case 'rotate-1':
					transform2DProperty = transform2DProperty - 1;
					wrapper.setAttribute('data-rotate', transform2DProperty);
					break;
			}

			const shiftY = 'translateY(' + transformVProperty + 'px)';
			const shiftX = 'translateX(' + transformHProperty + 'px)';
			const shift3D = 'rotateY(' + transform3DProperty + 'deg)';
			const shift2D = 'rotate(' + transform2DProperty + 'deg)';
			wrapper.style.transform = shiftX + ' ' + shiftY + ' ' + shift3D + ' ' + shift2D;
		}
	},

	// loadJson() {
	// 	function readTextFile(file, callback) {
	// 		var rawFile = new XMLHttpRequest();
	// 		rawFile.overrideMimeType("application/json");
	// 		rawFile.open("GET", file, true);
	// 		rawFile.onreadystatechange = function() {
	// 			if (rawFile.readyState === 4 && rawFile.status == "200") {
	// 				callback(rawFile.responseText);
	// 			}
	// 		}
	// 		rawFile.send(null);
	// 	}
	//
	// 	readTextFile("src/transliterate.json", function(text){
	// 		var data = JSON.parse(text);
	// 		console.log(data);
	// 	});
	// },

	createHtml(wrapperid) {
		const content =`
			<!-- Begin of header -->
			<header class="header">
				<div class="header-controls header-controls-small">
				</div>
				<div class="header-controls">
					<label class="label-radio">
						<input type="radio" id="scaleMode" class="mode input-radio" name="mode" checked><span>Scale mode</span>
					</label>
					<label class="label-radio radio-inverted">
						<input type="radio" id="compareMode" name="mode" class="mode input-radio"><span>Compare mode</span>
					</label>
				</div>
				<div class="header-controls header-controls-small">
					<label class="language-radio">
						<input type="radio" id="uk" class="language input-radio" name="language" checked><span></span>
					</label>
					<label class="language-radio">
						<input type="radio" id="en" name="language" class="language input-radio"><span></span>
					</label>
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
				<div class="wrapper-inner controll-panel">
					<div class="flex-full-width">
						<button class="btn full-width-btn right" id="sidebar-position">
						<span class="inner-left" data-translate="place_sidebar_left"></span>
						<span class="inner-right" data-translate="place_sidebar_right"></span>
						</button>
					</div>
					<ul  class="panel-list">
						<li>
							<ul class="panel-list-item">
								<li class="panel-item">
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
								<li class="panel-item compare-mode__element">
									<form name="scaleForm" oninput="rangevalue.value = scale.valueAsNumber">
										<label for="scaleOrig">Scale:</label>
										<output name="rangevalue" for="range">100</output>
										<input type="range" id="scaleOrig" name="scale" data-id="scale"
										   class="input"
										   value="100"
										   min="0" max="200" step="1">
									  
									</form>		
									
								</li>
								<li class="panel-item compare-mode__element">
									<div class="move-btn-wrapper">
										<div class="move-btn-container">
											<button class="btn move-btn" title="Up" data-target="original"  data-id="Up"></button>
											<button class="btn move-btn" title="Right" data-target="original"  data-id="Right"></button>
											<button class="btn move-btn" title="Left" data-target="original"  data-id="Left"></button>
											<button class="btn move-btn" title="Bottom" data-target="original"  data-id="Bottom"></button>
										</div>
									</div>
								</li>
								<li class="panel-item compare-mode__element text-center">
									<button class="btn icon-btn" title="Rotate 90 clockwise" data-target="original" data-id="Rotate90">
										<svg class="icon">
										  <use xlink:href="#rotate-right-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" title="Rotate 90 counter-clockwise" data-target="original" data-id="Rotate-90">
										<svg class="icon">
										  <use xlink:href="#rotate-left-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" title="Rotate 1 clockwise" data-target="original"  data-id="Rotate1">
										<svg class="icon">
										  <use xlink:href="#rotate-right"></use>
										</svg>
									</button>
									<button class="btn icon-btn" title="Rotate 1 counter-clockwise" data-target="original"  data-id="Rotate-1">
										<svg class="icon">
										  <use xlink:href="#rotate-left"></use>
										</svg>
									</button>
								</li>
							</ul>
						</li>
						
						<li class="compare-mode__element">
							<ul class="panel-list-item ">
								
								<li class="panel-item">
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
									<form name="scaleForm" oninput="rangevalue.value = scale.valueAsNumber">
										<label for="scaleCopy">Scale:</label>
										<output name="rangevalue" for="range">100</output>
										<input type="range" id="scaleCopy" name="scale" data-id="scale"
										   class="input"
										   value="100"
										   min="0" max="200" step="1">
									  
									</form>		
								</li>
								<li class="panel-item compare-mode__element">
									<div class="move-btn-wrapper">
										<div class="move-btn-container">
											<button class="btn move-btn" title="Up" data-target="copy" data-id="Up"></button>
											<button class="btn move-btn" title="Right" data-target="copy" data-id="Right"></button>
											<button class="btn move-btn" title="Left" data-target="copy" data-id="Left"></button>
											<button class="btn move-btn" title="Bottom" data-target="copy" data-id="Bottom"></button>
										</div>
									</div>
								</li>
								<li class="panel-item compare-mode__element text-center">
									<button class="btn icon-btn" title="Rotate 90 clockwise" data-target="copy" data-id="Rotate90">
										<svg class="icon">
										  <use xlink:href="#rotate-right-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" title="Rotate 90 counter-clockwise" data-target="copy" data-id="Rotate-90">
										<svg class="icon">
										  <use xlink:href="#rotate-left-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" title="Rotate 1 clockwise" data-target="copy"  data-id="Rotate1">
										<svg class="icon">
										  <use xlink:href="#rotate-right"></use>
										</svg>
									</button>
									<button class="btn icon-btn" title="Rotate 1 counter-clockwise" data-target="copy"  data-id="Rotate-1">
										<svg class="icon">
										  <use xlink:href="#rotate-left"></use>
										</svg>
									</button>
								</li>
								<li class="panel-item">
									<form name="scaleForm" oninput="opacityvalue.value = opacity.valueAsNumber">
										<label for="opacity">Opacity:</label>
										<output name="opacityvalue" for="opacity">0.5</output>
										<input type="range" id="opacity" name="opacity"
											   class="input"
				
											   value="0.5"
											   min="0" max="1" step="0.05">
								   </form>
								</li>				
								<li class="panel-item compare-mode__element">
									<button class="btn" title="Mirror" data-target="copy" data-id="Mirror">Mirror</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
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
