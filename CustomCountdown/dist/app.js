window.addEventListener("DOMContentLoaded", () => {


	const getElByID = element => {return document.getElementById(element)};

	const selectDateEl = getElByID('select-date');
	const counterEl = getElByID('counter');
	const completeEl = getElByID('complete');
	const countdownForm = getElByID('countdown-form');
	const titleInputEl = getElByID('input-title');
	const dateInputEl = getElByID('input-date');

	const counterTitleEl = getElByID('counter-title');
	const daysEl = getElByID('days');
	const hoursEl = getElByID('hours');
	const minutesEl = getElByID('minutes');
	const secondsEl = getElByID('seconds');

	const submitBtn = getElByID('submit-btn');
	const resetBtns = document.querySelectorAll('.reset-btn');


	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	let titleText = '';
	let counterDate = '';
	let counterDateValue = Date();
	let activeCountDown;
	let savedCountDown;

	// Set Date input min value to today
	const today = new Date().toISOString().split('T');
	dateInputEl.setAttribute('min', today[0]);

	function updateDOM() {
		activeCountDown = setInterval(() => {
			const now = new Date().getTime();
			const timeLeft = counterDateValue - now;
			const daysLeft = Math.floor(timeLeft / day);
			const hoursLeft = Math.floor((timeLeft % day) / hour) - 2;
			const minutesLeft = Math.floor((timeLeft % hour) / minute);
			const secondsLeft = Math.floor((timeLeft % minute) / second);

			if (timeLeft > 0) {
				// Set time to counter elements
				daysEl.innerText = daysLeft;
				hoursEl.innerText = hoursLeft;
				minutesEl.innerText = minutesLeft;
				secondsEl.innerText = secondsLeft;
			} else {
				//reset();
				console.log('tick')
				selectDateEl.classList.add('hidden');
				counterEl.classList.add('hidden');
				completeEl.classList.remove('hidden');
				const completeMessage = getElByID('complete-message');
				completeMessage.innerText = `${titleText} finished on ${counterDate}`
				clearInterval(activeCountDown);
				counterDate = '';
				titleText ='';
			}
		}, second);
	}


	function updateCounter(e) {
		e.preventDefault();
		titleText = e.srcElement[0].value;
		counterDate = e.srcElement[1].value;
		counterTitleEl.innerText = titleText;
		savedCountDown = {
			title: titleText,
			date: counterDate
		}
		localStorage.setItem('countdown', JSON.stringify(savedCountDown));

		// check if no date entered
		if (counterDate === '') {
			alert('Please enter date');
		} else {
			counterDateValue = new Date(counterDate).getTime();
			console.log(counterDateValue);
			updateDOM();
			selectDateEl.classList.add('hidden');
			counterEl.classList.remove('hidden');
		}
	}

	function reset() {
		selectDateEl.classList.remove('hidden');
		counterEl.classList.add('hidden');
		completeEl.classList.add('hidden');
		clearInterval(activeCountDown);
		counterDate = '';
		titleText ='';
		localStorage.removeItem('countdown');
	}

	function getPrevCounter() {
		 // Get countdown from localStorage if available
		 if (localStorage.getItem('countdown')) {
		 	savedCountDown = JSON.parse(localStorage.getItem('countdown'));
		 	counterTitleEl.innerText = savedCountDown.title;
		 	counterDate = savedCountDown.date;
		 	counterDateValue = new Date(counterDate).getTime();
		 	updateDOM();
		 	selectDateEl.classList.add('hidden');
		 	counterEl.classList.remove('hidden');
		 }
	}


	countdownForm.addEventListener('submit', updateCounter);
	resetBtns.forEach(btn => { btn.addEventListener('click', reset);})

	getPrevCounter();
});