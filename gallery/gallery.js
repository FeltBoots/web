'use strict';

class Gallery {
	constructor(urls, container, maxRequestAllowed,
		createImageProgreesBar, defaultImg) {
		this.container = container;
		this.imagesQueue = maxRequestAllowed;
		this.imagesLoaded = 0;
		this.createImageProgreesBar = createImageProgreesBar;
		this.defaultImg = defaultImg;
		this.urls = urls;
		for (let i = 0; i < Math.min(maxRequestAllowed, urls.length); i++) {
			this.loadDoc(urls[i]);
		}
	}

	loadDoc(url) {
		let imageContainer = document.createElement('div');
		let img = document.createElement('img');
		imageContainer.classList.add('container-img');
		imageContainer.appendChild(img);
		this.container.appendChild(imageContainer);

		let progressBarContainer = document.createElement('div');
		progressBarContainer.classList.add('progress-bar-container');
		progressBarContainer.id = url;
		imageContainer.appendChild(progressBarContainer);

		let progressBar = this.createImageProgreesBar(progressBarContainer);

		let xhr = new XMLHttpRequest();

		let self = this;
		xhr.onreadystatechange = () => {
			let minProgress = 0.05;
			if (xhr.readyState == 2) {
				progressBar.animate(minProgress);
			}
			if (xhr.readyState == 3) {
				xhr.onprogress = e => {
					progressBar.animate(Math.max(minProgress, e.loaded / e.total));
				}
			}
			if (xhr.readyState == 4) {
				progressBarContainer.remove();
				img.onload = () => {
					img.classList.add('m-fadeOut');
					img.classList.add("m-fadeIn");
				}
				if (xhr.status == 200) {
					var blob = new Blob([xhr.response], {
				    	type: xhr.getResponseHeader("Content-Type")
				   	});
				   	var imgUrl = window.URL.createObjectURL(blob);
				   	img.src = imgUrl;
				}
				else {
					img.src = self.defaultImg;
				}
				self.imagesLoaded++;
				if (self.imagesQueue < self.urls.length) {
					self.imagesQueue++;
					self.loadDoc(self.urls[self.imagesQueue]);
				}
		 	}
		}
	 	xhr.responseType = "arraybuffer";
	 	xhr.open("GET", url, true);
		xhr.send();
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
