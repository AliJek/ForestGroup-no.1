// NAVIGATION
const navBtn = document.querySelector('.navbar__btn');
const navbar = document.querySelector('.navbar');
const navList = document.querySelector('.navbar__list');
const navItems = document.querySelectorAll('.navbar__list-link');

// CONTACT CARDS
const backBtn = document.querySelectorAll('.back-card__btn');
const frontBtn = document.querySelectorAll('.front-card__btn');
const frontCardd = document.querySelectorAll('.front-card');
const backCard = document.querySelectorAll('.back-card');

// CONTACT FORM
const username = document.querySelector('#name');
const secondName = document.querySelector('#secondname');
const selectedCategory = document.querySelector('#category');
const sendBtn = document.querySelector('.contact__btn-send');
const cancelBtn = document.querySelector('.contact__btn-cancel');
const popup = document.querySelector('.popup');

// FOOTER
const section = document.querySelectorAll('section');
const footerYear = document.querySelector('.footer__bottom-year');

// NAVIGATAION HANDLER
const mobileNavToggle = () => {
	const visibility = navList.getAttribute('data-visible');

	if (visibility === 'false') {
		navBtn.setAttribute('data-visible', true);
		navList.setAttribute('data-visible', true);
	} else {
		navBtn.setAttribute('data-visible', false);
		navList.setAttribute('data-visible', false);
	}
	navItems.forEach((el) => {
		el.addEventListener('click', (e) => {
			navBtn.setAttribute('data-visible', false);
			navList.setAttribute('data-visible', false);
		});
	});
};

// NAVIGATION TRACKER
window.onscroll = function () {
	section.forEach((el) => {
		let top = window.scrollY + 60;
		let offset = el.offsetTop;
		let height = el.offsetHeight;
		let id = el.getAttribute('id');

		if (top >= offset && top <= offset + height) {
			navItems.forEach((nav) => {
				nav.classList.remove('active');
				document
					.querySelector('.navbar__list-link[href*=' + id + ']')
					.classList.add('active');
			});
		}
	});
};

// FOOTER
const handleFooterYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = `@${year}`;
};
handleFooterYear();

//OFFER CARDS
frontBtn.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const frontCar = e.target.closest('div');
		const backCar2 = frontCar.nextElementSibling;
		frontCar.setAttribute('data-visible', false);
		backCar2.setAttribute('data-visible', true);
	});
});

backBtn.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const backCard = e.target.closest('div');
		const frontCard = backCard.previousElementSibling;
		frontCard.setAttribute('data-visible', true);
		backCard.setAttribute('data-visible', false);
		event.preventDefault();
	});
});

// CONTACT FORM
const showError = (input) => {
	const contactBox = input.parentElement;
	const errorMsg = contactBox.querySelector('.contact__box-error');

	contactBox.classList.add('error');
	errorMsg.textContent = 'uzupełnij wszystkie pola!';
};

const clearError = (input) => {
	const contactBox = input.parentElement;
	contactBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value !== '' && el.value !== 'none') {
			clearError(el);
		} else {
			showError(el);
		}
	});
};

const checkErrors = (input) => {
	const allInputs = document.querySelectorAll('.contact__box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.style.display = 'flex';
		input.forEach((el) => {
			setTimeout(() => {
				popup.style.display = 'none';
				el.value = '';
			}, 3600);
		});
	}
};

navBtn.addEventListener('click', mobileNavToggle);

sendBtn.addEventListener('click', (e) => {
	checkForm([username, secondName, selectedCategory]);
	checkErrors([username, secondName, selectedCategory]);
	e.preventDefault();
});

cancelBtn.addEventListener('click', (e) => {
	[username, secondName, selectedCategory].forEach((el) => {
		el.value = '';
		clearError(el);
	});
	e.preventDefault();
});
