const mainContainer = document.getElementById('container');
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const nextBtn = document.getElementById('next-quote');
const loader = document.getElementById('loader');


function loading() {
	mainContainer.hidden = true;
	loader.hidden = false;
}

function complete() {
	mainContainer.hidden = false;
	loader.hidden = true;
}

function newQuote() {
	loading();
	const randomQuote = getQuote().then((result) => {
		console.log(result);
		if (result.content.length >= 130) mainContainer.style = 'max-width: 70rem;';
		quoteEl.innerText = result.content;
		authorEl.innerText = result.author;
	}, (err) => {
		console.log(err);
	});
	console.log(randomQuote);
	//quoteEl.innerText = randomQuote.content;
	//authorEl.innerText = randomQuote.author;
	//console.log(randomQuote.content)
	setTimeout(complete,500);
}


async function getQuote() {
	loading();
	const apiURL = 'https://api.quotable.io/random';
	try {
		const response = await fetch(apiURL);
		const quoteObj = await response.json();
		//console.log(quoteObj)
		return quoteObj;
	} catch (error) {
		console.log(error);
	}
}

function tweetQuote() {
	const twitterUrl = `https://twitter.com/compose/tweet?text=${quoteEl.innerText} - ${authorEl.innerText}`;
	window.open(twitterUrl, '_blank');
}

nextBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
newQuote();