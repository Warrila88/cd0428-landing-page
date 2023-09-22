/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * created "let" for variables 'sections' and 'navbarList' to be global to be accessed from anywhere in the code.
*/
let sections;
let navbarList;
/**
 * End Global Variables
 * Start Helper Functions
 * Array.from will be returned by querySelectorAll into an array. The forEach loop is
 * used to iterate over each section in the sections array. In the loop, I can go in each section
 * using the section parameter and perform any action on it.
*/
sections = Array.from(document.querySelectorAll('section'));

// Build the nav and the following should be dynamic:
// I am telling the 'document' to search for 'navbar__list', so then the variable 'navbarList' will hold it.
navbarList = document.getElementById('navbar__list');
// Make a helper function for the unordered list element called 'createNavigationMenu'.
/**
 * Create the function 'createNavigationMenu' to create and organize sections on the page
 * from 'navbarList'. This will check Id and Title for the 'navList'.
 * Calling 'createNavigationMenu' will process the information to the 'navbarList'.
 * @description Represents the navigation menu
 */
function createNavigationMenu() {
    const navList = document.createElement('ul');
    sections.forEach((section) => {
        const sectionId = section.id;
        const sectionTitle = section.dataset.nav;
// Add the variable 'naveItem' to the unordered list variable 'navList'.
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a class='menu__link' href='#${sectionId}'>${sectionTitle}</a>`;
// When the section's heading is clicked on, it will collapse, which will hide or show its content
        const sectionHeading = section.querySelector('h2');
        sectionHeading.addEventListener('click', () => {
            section.classList.toggle('collapsed');
        });
// Add the navItem from within the unordered list to the navbar
        navbarList.appendChild(navItem);
    });
    navbarList.appendChild(navList);
};
// Call the function
createNavigationMenu();
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// Add class 'active' to section when near top of viewport
/**
 * Create function called 'makeActive' to go through sections. Next create
 * a variable called 'box' that has a top and bottom within 150 value of each other.
 * When it does, add the 'your-active-class'. When it does not, remove it instead.
 * Then add an EventListener to the document to listen for 'makeActive' when scrolling.
 * @description Represents active state for items in viewport
 */
function makeActive() {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        }
    }
}
document.addEventListener('scroll', makeActive);
/**
 * End Main Functions
 * Begin Events
 * Added an EventListener to highlight section in viewport upon scrolling when clicked
*/
// Scroll to anchor ID using scrollTO event
/**
 * The navbarList has a EventListener attached to it in order to 'listen' when
 * the event is clicked on. The EventListener finds the match of 'menu__link' with it
 * in order for a 'smooth' transition to scroll correctly.
 */
navbarList.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('menu__link')) {
        const targetId = event.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({behavior: 'smooth'});
    }
});
// Build menu
/**
 * Add an EventListener for the window when scrolling.
 * Set a timeout 2000(2 secs) to hide the navigation bar.
 */
const navbarMenu = document.querySelector('.navbar__menu');

let scrollingTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollingTimeout);

    navbarMenu.classList.remove('hidden');

    scrollingTimeout = setTimeout(() => {
        navbarMenu.classList.add('hidden');
    }, 2000);
});
/**
 * Add a variable called 'scrollToTopButton' for placing an
 * EventListener for a button at the bottom of the page. When clicked,
 * it will scroll smoothly to the beginning of the page.
 */
const scrollToTopButton = document.getElementById('scrollToTopButton');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Set sections as active


