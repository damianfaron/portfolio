const nav = document.querySelector('.nav');
const navBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav-item');
const headerBtn = document.querySelector('.header-button');
const aboutMe = document.getElementById('Omnie');

// =======================================================
/* Funckaj do buttona i nawigacji chowanie + usuwanie po wybraniu elementu */
// =======================================================
const showNav = () => {
	nav.classList.toggle('nav-show');
	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav-show');
		});
	});
};

navBtn.addEventListener('click', showNav);
// =======================================================
/* Funckaj do strzałki z header*/
// =======================================================
const scrollHeaderToAboutMe = () => {
	aboutMe.scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	});
};
headerBtn.addEventListener('click', scrollHeaderToAboutMe);
//
// =======================================================
// /* Funkcja sprawdzająca, czy element jest widoczny na ekranie
// =======================================================

const options = {
	root: null, // Brak korzenia, tzn. sprawdzamy widoczność w kontekście okna przeglądarki
	threshold: 0.05, // 50% elementu musi być widoczne, aby wywołać akcję
};

// Funkcja, która dodaje klasę "animate" do sekcji, gdy staje się widoczna
function handleIntersection(entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate'); // Dodanie klasy, która uruchamia animację
			observer.unobserve(entry.target); // Przestaje obserwować, gdy animacja jest już uruchomiona
		}
	});
}

// Tworzymy nowego Intersection Observera
const observer = new IntersectionObserver(handleIntersection, options);

// Obserwujemy wszystkie sekcje
const sections = document.querySelectorAll('.section');
sections.forEach((section) => {
	observer.observe(section);
});

// =======================================================
// /* Funkcja do sprawadznia roku
// =======================================================

const currentYear = new Date().getFullYear();
const currentYearElement = document.querySelector('.year');

const updateYear = () => {
	currentYearElement.textContent = currentYear;
};
updateYear();
// =======================================================
// Funkcja do powrotu do góry
// =======================================================
const goTopBtn = document.querySelector('.end-footer-button');

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};
goTopBtn.addEventListener('click', scrollToTop);
// =======================================================
// Funkcja do zmiany koloru buttona navigacji
// =======================================================

const burgerBtn = document.querySelector('.burger-btn');
const header = document.querySelector('.header');
const main = document.querySelector('main');

const changeButtonColor = () => {
	const headerPosition = header.getBoundingClientRect();
	const mainPosition = main.getBoundingClientRect();

	const headerHeight = header.offsetHeight;
	const threshold = headerHeight * 0.9; // 90% wysokości header

	// Sprawdzamy, czy przycisk znajduje się w okolicach 90% wysokości header
	if (headerPosition.top <= -threshold) {
		burgerBtn.classList.add('main-color');
		burgerBtn.classList.remove('header-color');
	} else {
		burgerBtn.classList.add('header-color');
		burgerBtn.classList.remove('main-color');
	}
};

// Nasłuchiwanie na przewijanie strony
window.addEventListener('scroll', changeButtonColor);
//
// email:
// Import EmailJS (jeśli używasz modułów, np. z npm, upewnij się, że jest zainstalowane)
// import emailjs from 'emailjs-com';

// // Funkcja do wysyłania e-maila

// const sendEmail = (form) => {
// 	emailjs
// 		.sendForm(
// 			'service_78t3w7f', // Wstaw swój Service ID
// 			'template_7fctn6n', // Wstaw swój Template ID
// 			form,
// 			'a3J6eP8ma3eRanVBi' // Wstaw swój Public Key
// 		)
// 		.then((response) => {
// 			console.log('SUCCESS!', response.status, response.text);
// 			alert('Wiadomość została wysłana!');
// 		})
// 		.catch((error) => {
// 			console.error('FAILED...', error);
// 			alert('Błąd podczas wysyłania wiadomości: ' + error.text);
// 		});
// };

// // Obsługa formularza
// const contactForm = document.getElementById('contactForm');
// contactForm.addEventListener('submit', (event) => {
// 	event.preventDefault(); // Zatrzymaj domyślne wysyłanie formularza
// 	sendEmail(contactForm); // Wyślij dane formularza przez EmailJS
// });
