const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let imagesTotal = 0;
let photosArray = [];

// Unsplash API
const count = 20;
const api_KEY = 'giJg99t8iY0DhrKdzaRXUMh2DhdKqPXEMVUsPYlqi38';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${api_KEY}&count=${count}`;


function imgIsLoaded() {
	imagesLoaded++;	
	if (imagesLoaded === imagesTotal) {
		ready = true;
		loader.hidden = true;
	}
}

// Helper function
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	imagesTotal = photosArray.length;
	// Run function for each element in photosArray
	photosArray.forEach(photo => {
		// Create link to full image
		const link = document.createElement('a');
		setAttributes(link, {
			src: photo.links.html,
			target: '_blank'
		});

		// Create img tag
		const imgEl = document.createElement('img');
		setAttributes(imgEl, {
			src: photo.urls.regular,
			alt: photo.alt_description
		});
		imgEl.addEventListener('load', imgIsLoaded);
		link.appendChild(imgEl);
		imageContainer.appendChild(link);
		//console.log(imageContainer);
	})
}

// Get Photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		photosArray = await response.json();
		//console.log(photosArray);
		displayPhotos();
	} catch(error) {
		console.log(error);
	}
}


window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
	//console.log(window.innerHeight,window.scrollY, document.body.offsetHeight);
});

getPhotos();