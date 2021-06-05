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


const plagiart = {


	init(wrapperId) {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', './src/transliterate.json', true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			setLanguagesAndStart(xhr.status,  xhr.response)
		};
		xhr.send();

		function setLanguagesAndStart(status, response) {
			if (status === 200) {
				plagiart.languagesSet = response;
			} else {
				showModal('modal');
				console.log(status);
			}
			window.onload = plagiart.main(wrapperId);
		}

		// fetch('./src/transliterate.json', {method: 'GET'})
		// 	.then(
		// 		function(response) {
		// 			const status = response.status;
		// 			if (status !== 200) {
		// 				console.log('Looks like there was a problem. Status Code: ' +
		// 					status);
		// 				return;
		// 			}
		// 			debugger;
		// 			// Examine the text in the response
		// 			response.json().then(function(response) {
		// 				setLanguagesAndStart(status, response);
		// 			});
		// 		}
		// 	)
		// 	.catch(function(err) {
		// 		console.log('Fetch Error :-S', err);
		// 	});

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
		this.language = 'uk';
		this.translate();
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
	},

	translate() {
		const language = this.language;
		const langSet = this.languagesSet;
		// inner text translation
		const elementsToTranslate = document.querySelectorAll('[data-translate]');
		elementsToTranslate.forEach( element => {
			const translationKey = element.getAttribute('data-translate');
			element.innerHTML = langSet[translationKey][language];
		});
		// title attribute translation
		const titlesToTranslate = document.querySelectorAll('[data-title-translate]');
		titlesToTranslate.forEach( element => {
			const translationKey = element.getAttribute('data-title-translate');
			element.setAttribute('title', langSet[translationKey][language]);
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

	},

	moveCopy(direction, target) {
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
	},

	createHtml(wrapperid) {
		const content =`
			<!-- svg sprite -->
			<svg display="none">
				<symbol id="rotate-left-90" class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
				 viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
					<path d="M510.9 127.6c-120.1 0-233.2 56.7-305.3 151.3-13.6 17.9-5 43.9 16.6 50.1 2.9 0.8 5.9 1.3 8.9 1.3 9.8 0 19.3-4.5 25.4-12.6 60.1-78.8 154.4-126.1 254.4-126.1 28.5 0 57.4 3.8 86.1 11.9C767.8 251.1 867 427 819.4 597.7c-39.5 141.7-168.2 234.1-308.1 234.1-29.3 0-59.2-4.1-88.8-12.6-130.3-37.5-218.2-150.6-230.1-277.9-1.2-13-10.4-24-23-27.6-3-0.9-6-1.3-9-1.3-18.1 0-33.6 15.6-31.8 34.9C142.9 700 248.5 835.7 404.8 880.7c35.5 10.2 71.3 15.1 106.5 15.1 167 0 320.7-109.8 369-278.5 58.4-204-60.9-417.8-265.2-475.3-34.7-9.7-69.7-14.4-104.2-14.4z"/>
					<path d="M204.1 162.5h-32v160c0 17.7 14.3 32 32 32h159v-32c0-17.7-14.3-32-32-32h-95v-96c0-17.7-14.3-32-32-32z" />
					<path d="M323.7 552.5l54.1-6.8c1.4 7.6 3.8 12.9 7.2 16 3.4 3.1 7.5 4.7 12.4 4.7 8.7 0 15.5-4.4 20.4-13.2 3.6-6.5 6.2-20.3 8-41.3-6.5 6.7-13.2 11.6-20 14.7-6.9 3.1-14.8 4.7-23.8 4.7-17.6 0-32.4-6.2-44.4-18.7-12.1-12.5-18.1-28.2-18.1-47.3 0-13 3.1-24.9 9.2-35.5 6.1-10.7 14.6-18.8 25.4-24.3 10.8-5.5 24.3-8.2 40.6-8.2 19.6 0 35.3 3.4 47.2 10.1 11.8 6.7 21.3 17.4 28.4 32.1 7.1 14.7 10.6 34 10.6 58.1 0 35.4-7.4 61.3-22.3 77.7-14.9 16.4-35.5 24.7-61.9 24.7-15.6 0-27.9-1.8-36.9-5.4-9-3.6-16.5-8.9-22.4-15.8-5.9-7.2-10.5-15.9-13.7-26.3z m100.2-87.4c0-10.6-2.7-18.9-8-24.9s-11.8-9-19.5-9c-7.2 0-13.2 2.7-18 8.2-4.8 5.4-7.1 13.6-7.1 24.5 0 11 2.5 19.3 7.4 25.1 4.9 5.8 11.1 8.7 18.5 8.7 7.7 0 14-2.8 19.1-8.4s7.6-13.8 7.6-24.2zM503.8 497.7c0-37.2 6.7-63.3 20.1-78.2 13.4-14.9 33.8-22.3 61.3-22.3 13.2 0 24 1.6 32.5 4.9 8.5 3.3 15.4 7.5 20.7 12.7 5.3 5.2 9.6 10.7 12.6 16.4 3.1 5.7 5.5 12.5 7.4 20.1 3.7 14.6 5.5 29.8 5.5 45.7 0 35.5-6 61.6-18 78-12 16.5-32.7 24.7-62.1 24.7-16.5 0-29.8-2.6-40-7.9-10.2-5.3-18.5-13-25-23.1-4.7-7.2-8.4-17.1-11-29.6-2.7-12.4-4-26.3-4-41.4z m54 0.1c0 24.9 2.2 42 6.6 51.1 4.4 9.1 10.8 13.7 19.2 13.7 5.5 0 10.3-1.9 14.4-5.8s7-10 9-18.4c1.9-8.4 2.9-21.4 2.9-39.2 0-26-2.2-43.5-6.6-52.4-4.4-9-11-13.4-19.8-13.4-9 0-15.5 4.6-19.5 13.7-4.2 9.1-6.2 26.1-6.2 50.7zM767.6 435.4c0 10.5-3.7 19.5-11.2 27-7.5 7.5-16.5 11.2-27.1 11.2-10.5 0-19.5-3.7-27-11.2-7.5-7.5-11.2-16.5-11.2-27 0-10.6 3.7-19.6 11.2-27.1 7.5-7.4 16.5-11.2 27-11.2 10.6 0 19.6 3.7 27.1 11.2 7.4 7.5 11.2 16.5 11.2 27.1z m-24.9-0.1c0-3.7-1.3-6.9-3.9-9.6-2.6-2.7-5.8-4-9.6-4-3.7 0-6.9 1.3-9.6 4-2.7 2.7-4 5.9-4 9.6 0 3.7 1.3 6.9 4 9.6 2.7 2.6 5.9 3.9 9.6 3.9 3.7 0 6.9-1.3 9.6-3.9 2.6-2.7 3.9-5.9 3.9-9.6z"/>
				</symbol>
				<symbol id="rotate-right-90" class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
				 viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
					<path d="M512.7 127.6c-34.4 0-69.4 4.7-104.2 14.4C204.3 199.6 85 413.3 143.3 617.3c48.3 168.7 202 278.5 369 278.5 35.2 0 71-4.9 106.5-15.1C775.1 835.7 880.7 700 895 547.3c1.8-19.3-13.7-34.9-31.8-34.9-2.9 0-5.9 0.4-8.9 1.3-12.6 3.6-21.8 14.6-23 27.6-11.8 127.3-99.8 240.4-230.1 277.9-29.6 8.5-59.4 12.6-88.8 12.6-139.8 0-268.5-92.4-308.1-234.1-47.6-170.7 51.6-346.6 222.3-394.2 28.7-8 57.7-11.9 86.1-11.9 100 0 194.4 47.3 254.4 126.1 6.2 8.1 15.6 12.6 25.4 12.6 2.9 0 5.9-0.4 8.9-1.3 21.6-6.2 30.3-32.2 16.6-50.1-72-94.5-185.2-151.3-305.3-151.3z"/>
					<path d="M851.5 162.5h-32c-17.7 0-32 14.3-32 32v96h-95c-17.7 0-32 14.3-32 32v32h159c17.7 0 32-14.3 32-32v-160z" />
					<path d="M338.7 552.5l54.1-6.8c1.4 7.6 3.8 12.9 7.2 16 3.4 3.1 7.5 4.7 12.4 4.7 8.7 0 15.5-4.4 20.4-13.2 3.6-6.5 6.2-20.3 8-41.3-6.5 6.7-13.2 11.6-20 14.7-6.9 3.1-14.8 4.7-23.8 4.7-17.6 0-32.4-6.2-44.4-18.7-12.1-12.5-18.1-28.2-18.1-47.3 0-13 3.1-24.9 9.2-35.5 6.1-10.7 14.6-18.8 25.4-24.3 10.8-5.5 24.3-8.2 40.6-8.2 19.6 0 35.3 3.4 47.2 10.1 11.8 6.7 21.3 17.4 28.4 32.1 7.1 14.7 10.6 34 10.6 58.1 0 35.4-7.4 61.3-22.3 77.7-14.9 16.4-35.5 24.7-61.9 24.7-15.6 0-27.9-1.8-36.9-5.4-9-3.6-16.5-8.9-22.4-15.8-5.9-7.2-10.5-15.9-13.7-26.3z m100.2-87.4c0-10.6-2.7-18.9-8-24.9s-11.8-9-19.5-9c-7.2 0-13.2 2.7-18 8.2-4.8 5.4-7.1 13.6-7.1 24.5 0 11 2.5 19.3 7.4 25.1 4.9 5.8 11.1 8.7 18.5 8.7 7.7 0 14-2.8 19.1-8.4s7.6-13.8 7.6-24.2zM518.8 497.7c0-37.2 6.7-63.3 20.1-78.2 13.4-14.9 33.8-22.3 61.3-22.3 13.2 0 24 1.6 32.5 4.9 8.5 3.3 15.4 7.5 20.7 12.7 5.3 5.2 9.6 10.7 12.6 16.4 3.1 5.7 5.5 12.5 7.4 20.1 3.7 14.6 5.5 29.8 5.5 45.7 0 35.5-6 61.6-18 78-12 16.5-32.7 24.7-62.1 24.7-16.5 0-29.8-2.6-40-7.9-10.2-5.3-18.5-13-25-23.1-4.7-7.2-8.4-17.1-11-29.6-2.7-12.4-4-26.3-4-41.4z m54 0.1c0 24.9 2.2 42 6.6 51.1 4.4 9.1 10.8 13.7 19.2 13.7 5.5 0 10.3-1.9 14.4-5.8s7-10 9-18.4c1.9-8.4 2.9-21.4 2.9-39.2 0-26-2.2-43.5-6.6-52.4-4.4-9-11-13.4-19.8-13.4-9 0-15.5 4.6-19.5 13.7-4.2 9.1-6.2 26.1-6.2 50.7zM782.6 435.4c0 10.5-3.7 19.5-11.2 27-7.5 7.5-16.5 11.2-27.1 11.2-10.5 0-19.5-3.7-27-11.2-7.5-7.5-11.2-16.5-11.2-27 0-10.6 3.7-19.6 11.2-27.1 7.5-7.4 16.5-11.2 27-11.2 10.6 0 19.6 3.7 27.1 11.2 7.4 7.5 11.2 16.5 11.2 27.1z m-24.9-0.1c0-3.7-1.3-6.9-3.9-9.6-2.6-2.7-5.8-4-9.6-4-3.7 0-6.9 1.3-9.6 4-2.7 2.7-4 5.9-4 9.6 0 3.7 1.3 6.9 4 9.6 2.7 2.6 5.9 3.9 9.6 3.9 3.7 0 6.9-1.3 9.6-3.9 2.6-2.7 3.9-5.9 3.9-9.6z"/>
				</symbol>
				<symbol id="rotate-left" class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
				viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
					<path d="M510.9 127.6c-120.1 0-233.2 56.7-305.3 151.3-13.6 17.9-5 43.9 16.6 50.1 2.9 0.8 5.9 1.3 8.9 1.3 9.8 0 19.3-4.5 25.4-12.6 60.1-78.8 154.4-126.1 254.4-126.1 28.5 0 57.4 3.8 86.1 11.9C767.8 251.1 867 427 819.4 597.7c-39.5 141.7-168.2 234.1-308.1 234.1-29.3 0-59.2-4.1-88.8-12.6-130.3-37.5-218.2-150.6-230.1-277.9-1.2-13-10.4-24-23-27.6-3-0.9-6-1.3-9-1.3-18.1 0-33.6 15.6-31.8 34.9C142.9 700 248.5 835.7 404.8 880.7c35.5 10.2 71.3 15.1 106.5 15.1 167 0 320.7-109.8 369-278.5 58.4-204-60.9-417.8-265.2-475.3-34.7-9.7-69.7-14.4-104.2-14.4z"/>
					<path d="M204.1 162.5h-32v160c0 17.7 14.3 32 32 32h159v-32c0-17.7-14.3-32-32-32h-95v-96c0-17.7-14.3-32-32-32z" />
				</symbol>
				<symbol id="rotate-right" class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
				viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
					<path d="M512.7 127.6c-34.4 0-69.4 4.7-104.2 14.4C204.3 199.6 85 413.3 143.3 617.3c48.3 168.7 202 278.5 369 278.5 35.2 0 71-4.9 106.5-15.1C775.1 835.7 880.7 700 895 547.3c1.8-19.3-13.7-34.9-31.8-34.9-2.9 0-5.9 0.4-8.9 1.3-12.6 3.6-21.8 14.6-23 27.6-11.8 127.3-99.8 240.4-230.1 277.9-29.6 8.5-59.4 12.6-88.8 12.6-139.8 0-268.5-92.4-308.1-234.1-47.6-170.7 51.6-346.6 222.3-394.2 28.7-8 57.7-11.9 86.1-11.9 100 0 194.4 47.3 254.4 126.1 6.2 8.1 15.6 12.6 25.4 12.6 2.9 0 5.9-0.4 8.9-1.3 21.6-6.2 30.3-32.2 16.6-50.1-72-94.5-185.2-151.3-305.3-151.3z"/>
					<path d="M851.5 162.5h-32c-17.7 0-32 14.3-32 32v96h-95c-17.7 0-32 14.3-32 32v32h159c17.7 0 32-14.3 32-32v-160z" />
				</symbol>
			</svg>
			<!-- Begin of header -->
			<header class="header">
				<div class="header-controls header-controls-small">
				</div>
				<div class="header-controls">
					<label class="label-radio">
						<input type="radio" id="scaleMode" class="mode input-radio" name="mode" checked><span data-translate="scale_mode">Scale mode</span>
					</label>
					<label class="label-radio radio-inverted">
						<input type="radio" id="compareMode" name="mode" class="mode input-radio"><span data-translate="compare_mode"></span>
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
											<figcaption data-translate="original_picture"></figcaption>
									</figure>
									<label for="original" class="input-label btn full-width-btn">
										<span data-translate="upload_image"></span>
										<input type="file"
											   id="original" name="original"
											   placeholder="Original file"
											   accept="image/png, image/jpeg">
									</label>
								</li>
								<li class="panel-item scale-mode__element">
									<label for="canvasWidth">
										<span data-translate="canvas_width"></span>
										<input type="number"
											   id="canvasWidth"
											   data-input="height"
											   class="sizeInput input" value="0"
											   disabled>
									</label>
									<label for="canvasHeight">
										<span data-translate="canvas_height"></span>
										<input type="number"
											   id="canvasHeight"
											   data-input="width"
											   class="sizeInput input"
											   value="0"
											   disabled>
									</label>
								</li>
								<li class="panel-item scale-mode__element">
									<b><p data-translate="point_coords"></p></b>
									<p><span data-translate="by_horizontal"></span> <b id="remappedX"></b></p>
									<p><span data-translate="by_vertical"></span> <b id="remappedY"></b></p>
								</li>
								<li class="panel-item compare-mode__element">
									<form name="scaleForm" oninput="rangevalue.value = scale.valueAsNumber">
										<label for="scaleOrig" data-translate="scale"></label>
										<output name="rangevalue" for="range">100</output>%
										<input type="range" id="scaleOrig" name="scale" data-id="scale"
										   class="input"
										   value="100"
										   min="0" max="200" step="1">
									  
									</form>		
									
								</li>
								<li class="panel-item compare-mode__element">
									<div class="move-btn-wrapper">
										<div class="move-btn-container">
											<button class="btn move-btn" data-title-translate="up" 	data-target="original"  data-id="Up"></button>
											<button class="btn move-btn" data-title-translate="right" data-target="original"  data-id="Right"></button>
											<button class="btn move-btn" data-title-translate="left" data-target="original"  data-id="Left"></button>
											<button class="btn move-btn" data-title-translate="bottom"	data-target="original"  data-id="Bottom"></button>
										</div>
									</div>
								</li>
								<li class="panel-item compare-mode__element text-center">
									<button class="btn icon-btn" data-title-translate="clockwise_90" data-target="original" data-id="Rotate90">
										<svg class="icon">
										  <use xlink:href="#rotate-right-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" data-title-translate="counterclockwise_90" data-target="original" data-id="Rotate-90">
										<svg class="icon">
										  <use xlink:href="#rotate-left-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" data-title-translate="clockwise" data-target="original"  data-id="Rotate1">
										<svg class="icon">
										  <use xlink:href="#rotate-right"></use>
										</svg>
									</button>
									<button class="btn icon-btn" data-title-translate="counterclockwise" data-target="original"  data-id="Rotate-1">
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
											<figcaption data-translate="your_picture"></figcaption>
									</figure>
									<label for="clone" class="input-label btn full-width-btn">
										<span data-translate="upload_image"></span>
										<input type="file"
											   id="clone" name="clone"
											   placeholder="Your file"
											   accept="image/png, image/jpeg">
									</label>
								</li>
								<li class="panel-item compare-mode__element">
									<form name="scaleForm" oninput="rangevalue.value = scale.valueAsNumber">
										<label for="scaleOrig" data-translate="scale"></label>
										<output name="rangevalue" for="range">100</output>%
										<input type="range" id="scaleCopy" name="scale" data-id="scale"
										   class="input"
										   value="100"
										   min="0" max="200" step="1">
									  
									</form>		
								</li>
								<li class="panel-item compare-mode__element">
									<div class="move-btn-wrapper">
										<div class="move-btn-container">
											<button class="btn move-btn" data-title-translate="up" 	data-target="copy" data-id="Up"></button>
											<button class="btn move-btn" data-title-translate="right" data-target="copy" data-id="Right"></button>
											<button class="btn move-btn" data-title-translate="left" data-target="copy" data-id="Left"></button>
											<button class="btn move-btn" data-title-translate="bottom" data-target="copy" data-id="Bottom"></button>
										</div>
									</div>
								</li>
								<li class="panel-item compare-mode__element text-center">
									<button class="btn icon-btn" data-title-translate="clockwise_90" data-target="copy" data-id="Rotate90">
										<svg class="icon">
										  <use xlink:href="#rotate-right-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" data-title-translate="counterclockwise_90" data-target="copy" data-id="Rotate-90">
										<svg class="icon">
										  <use xlink:href="#rotate-left-90"></use>
										</svg>
									</button>
									<button class="btn icon-btn" data-title-translate="clockwise" data-target="copy"  data-id="Rotate1">
										<svg class="icon">
										  <use xlink:href="#rotate-right"></use>
										</svg>
									</button>
									<button class="btn icon-btn" data-title-translate="counterclockwise" data-target="copy"  data-id="Rotate-1">
										<svg class="icon">
										  <use xlink:href="#rotate-left"></use>
										</svg>
									</button>
								</li>
								<li class="panel-item">
									<form name="scaleForm" oninput="opacityvalue.value = transparency.valueAsNumber">
										<label for="transparency" data-translate="transparency"></label>
										<output name="opacityvalue" for="transparency">50</output>%
										<input type="range" id="transparency" name="transparency"
											   class="input"
				
											   value="50"
											   min="0" max="100" step="5">
								   </form>
								</li>				
								<li class="panel-item compare-mode__element">
									<button class="btn full-width-btn" title="Mirror" data-target="copy" data-id="Mirror" data-translate="mirror"></button>
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
