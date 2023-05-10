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


// Function executed directly at the page load
addNewSection();
buildNavbar();


// Start Helper Functions

// Clear all active states
function clearActiveState() {
  const items = document.getElementsByClassName('active');
  for (const item of items) {
    item.className = '';
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// Add fourth section

function addNewSection() {
  const sectionParent = document.querySelector('main');
  const newSection = document.createElement('section');
  newSection.id = 'section4';
  newSection.dataset.nav = 'Section 4';
  sectionParent.append(newSection);

  const newDiv = document.createElement('div');
  newDiv.className = 'landing__container';
  newSection.appendChild(newDiv);

  const newHeader = document.createElement('h2');
  newHeader.append('Section 4');
  newDiv.appendChild(newHeader);

  const newParagraph = document.createElement('p');
  newParagraph.append('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. ')
  newDiv.appendChild(newParagraph);

  const secondParagraph = document.createElement('p');
  secondParagraph.append('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. ')
  newDiv.appendChild(secondParagraph);
}

// Build the navigation bar from document sections
function buildNavbar() {
  const navBarList = document.getElementById('navbar__list');
  const sections = document.querySelectorAll('section');
  for (const section of sections) {
    const item = document.createElement("li");
    item.id = 'nav_' + section.id;
    item.dataset.sectionId = section.id;
    if (section.id == "section1") {
      item.className = 'active';
    }
    item.append(section.dataset.nav);
    navBarList.appendChild(item);
  }
  navBarList.addEventListener('click', scrollToSection)
}

// Scroll to section when clicked on the navigation bar item
function scrollToSection(event) {
  document.getElementById(event.target.dataset.sectionId).scrollIntoView({ behavior: "smooth" });
  event.preventDefault();
}

// Highlight the section and the navbar item after scroll event happened
function highlightScrolledSection() {
  const sections = document.querySelectorAll('section');
  const distancesToTop = [];
  sections.forEach(section => {
    const distanceToTop = section.getBoundingClientRect().top;
    if (distanceToTop >= 0) {
      distancesToTop.push({ "id": section.id, "top": distanceToTop });
    }
  });

  //Sort using "top" ascending to ensure the item with smallest top is selected as first
  distancesToTop.sort(function (a, b) {
    return a.top - b.top
  })

  // When user scrolled to to the footer, the last section is fully in viewport. 
  //Then array would be empty. Do nothing then
  if (distancesToTop.length > 0) {
    clearActiveState();
    const selectedNavSection = document.getElementById("nav_" + distancesToTop[0].id);
    selectedNavSection.classList.add('active');

    const selectedSection = document.getElementById(distancesToTop[0].id);
    selectedSection.classList.add('active');
  }
}

/**
 * End Main Functions
 * Begin Events
 *
*/
document.addEventListener('scroll', highlightScrolledSection);



