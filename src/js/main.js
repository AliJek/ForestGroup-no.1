const navBtn = document.querySelector('.navbar__btn');
const navbar = document.querySelector('.navbar');
const navList = document.querySelector('.navbar__list');
const navItems = document.querySelectorAll('.navbar__list-link');

const backBtn = document.querySelectorAll('.back-card__btn');
const frontBtn = document.querySelectorAll('.front-card__btn');

const section = document.querySelectorAll('section');
const footerYear = document.querySelector('.footer__bottom-year');

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

const handleFooterYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = `@${year}`;
};

const cardToggle = () => {};

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
	});
});

// backBtn.forEach(btn => {
//     btn.addEventListener('click', () => {
//        frontCard.style.display = 'flex'
//        backCard.style.display = 'none'
//     })
// })

handleFooterYear();
navBtn.addEventListener('click', mobileNavToggle);
