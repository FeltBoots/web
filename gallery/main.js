let urls = [
	"https://try1117.github.io/gallery/images/0.jpg",
	"https://try1117.github.io/gallery/images/1.jpg",
	"https://try1117.github.io/gallery/images/2.jpg",
	"https://try1117.github.io/gallery/images/3.jpg",
	"https://try1117.github.io/gallery/images/4.jpg",
	"https://try1117.github.io/gallery/images/5.jpg",
	"https://try1117.github.io/gallery/images/6.jpg",
	// "https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_960_720.jpg",
	"https://try1117.github.io/gallery/images/7.jpg",
	"https://try1117.github.io/gallery/images/8.jpg",
	"https://try1117.github.io/gallery/images/9.jpg",
	"https://try1117.github.io/gallery/images/10.jpg",
	"https://try1117.github.io/gallery/images/11.jpg",
	// "https://images.pexels.com/photos/34950/pexels-photo.jpg",
	"https://i.imgur.com/4y0EZuG.jpg",
	"https://i.imgur.com/CrHYfTG.jpg",
	"https://i.imgur.com/gQp3VSW.jpg",
	"https://i.imgur.com/M0SKsEE.jpg",
	"https://i.imgur.com/aBONniI.jpg",
	"https://i.imgur.com/eb4dOra.jpg",
	"https://i.imgur.com/qBz4xcn.jpg",
	"https://i.imgur.com/YEBeHG1.jpg",
	"https://i.imgur.com/oDwCk03.jpg",
	"https://i.imgur.com/6lP5BND.jpg",
	"https://i.imgur.com/hjHoxsp.jpg",
	"https://i.imgur.com/WUNSgmp.jpg",
	"https://i.imgur.com/PKU3RSE.jpg",
	"https://i.imgur.com/9mgcdli.jpg",
	"https://i.imgur.com/3NBq6n2.jpg",
	"https://i.imgur.com/74YY5FE.jpg",
	"https://i.imgur.com/EXsE5EM.jpg",
	"https://i.imgur.com/FR5BxXW.jpg",
	"https://i.imgur.com/05pGzjI.jpg",
	"https://i.imgur.com/rS9ttuE.jpg",
	"https://i.imgur.com/ypi2aRe.jpg",
]

let defaultImg = "http://www.alexander-td.com/sites/default/files/default_images/default-no-image_2.png";

window.onload = function() {

	let createImageProgreesBar = (element) => new ProgressBar.Circle(element, {
		color: '#FCB03C',
		easing: 'easeInOut',
		duration: 3000,
	});

	let containers = document.getElementsByClassName('gallery');
	for (let container of containers) {
		let g = new Gallery(urls, container, 4, createImageProgreesBar, defaultImg);
	}
}
