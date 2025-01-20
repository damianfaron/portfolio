const pagesBtn = document.querySelectorAll('.button');
const allSections = document.querySelectorAll('.section');

const changePage = (index) => {
	allSections.forEach((section) => {
		section.classList.remove('active');
	});
	pagesBtn.forEach((btn) => {
		btn.classList.remove('active');
	});
	allSections[index].classList.add('active');
	pagesBtn[index].classList.add('active');
};

pagesBtn.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		changePage(index);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	changePage(0); // Ustaw pierwszą sekcję jako aktywną
});
