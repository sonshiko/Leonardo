function renderHtml (wrapperid) {

    const headerContent =`
			<!-- Begin of header -->
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
		<!-- End of header -->
		`;
    const mainContent = `
		<!-- Main -->
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
		<!-- End of main -->
    `;
    const footerContent = `
		<!-- Footer -->
			<div>

			</div>

		<!-- End of footer -->
		`;
    const modalContent = `
        <h3>Something is went wrong. Click "OK" to reload page.</h3>
        <button class="btn" id="reload">Ok</button>`;
    const wrapper = document.getElementById(wrapperid);
    createElement('header', headerContent, wrapper, ['header']);
    createElement('main', mainContent, wrapper, ['main']);
    createElement('footer', footerContent, wrapper, ['footer']);
    createElement('div', modalContent, undefined, ['modal'], 'modal');
}

function createElement(tag, content, parentElement, classList, id) {
    const newElement = document.createElement(tag);
    newElement.innerHTML = content;
    if (parentElement) {
        parentElement.append(newElement)
    }  else {
        document.body.append(newElement);
    }
    if (typeof classList !== 'undefined') {
        classList.forEach( newClass => {
            newElement.classList.add(newClass);
        })
    }
    if (typeof id !== 'undefined') {
        newElement.setAttribute('id', id);
    }
}