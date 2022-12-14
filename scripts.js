// app object
const app = {};

// app variables
app.body = document.querySelector(`body`);
app.hamburger = document.querySelector(`.hamburger-btn`);
app.hamburgerIcon = app.hamburger.querySelector(`i`);
app.navName = app.hamburger.querySelector('p');
app.navUl = document.querySelector(`nav ul`);
app.body = document.querySelector(`body`);
app.aboutSection = document.querySelector('.about');
app.navLinks = app.navUl.querySelectorAll(`li a`);
app.projectDesc = document.querySelectorAll(`.project-description`);
app.gradientToggleText = document.querySelector(`.gradient-toggle p`);
app.gradientToggleCheckbox = document.querySelector(`.gradient-toggle .switch input`);
app.gradientToggleBtn = document.querySelector(`.gradient-toggle .switch`);
app.scrollDownBtn = document.querySelector(`.scroll-down`);
app.scrollTopBtn = document.querySelector(`.scroll-to-top`);

// mobile hamburger nav function
app.hamburgerFunction = () => {

    // if nav is not showing
    if(!app.navUl.style.display){

        // open nav
        app.hamburger.classList.add('hamburger-active');
        app.navUl.style.display = 'flex';
        app.body.classList.add('nav-open');
        app.navUl.style.animation = 'fade-in 0.4s';
        app.navUl.style.opacity = '1';

        // after nav is finished opening
        setTimeout(function(){

            // remove animation
            app.navUl.style.animation = '';

        }, 400)

    // if nav is showing
    } else {

        // hide nav
        app.hamburgerIcon.style.transform = `rotate(initial)`;
        app.hamburgerIcon.style.transition = `0.4s`;
        app.hamburger.classList.remove('hamburger-active');
        app.body.classList.remove('nav-open');
        app.navUl.style.animation = 'fade-out 0.4s';

        // after nav is finished hiding
        setTimeout(function(){

            // remove animation, opacity, and display values
            app.navUl.style.opacity = '0';
            app.navUl.style.display = '';
            app.navUl.style.animation = '';
            app.hamburgerIcon.style.transition = '';

        }, 400)
    }
}

// close mobile nav function
app.closeNav = () => {
    app.navUl.style.display = '';
    app.hamburgerIcon.style.transform = `rotate(initial)`;
    app.hamburgerIcon.style.transition = `0.4s`;
    app.hamburger.classList.remove('hamburger-active');
    app.body.classList.remove('nav-open');
    app.navName.style.display = '';
}

// animations toggle checkbox tab behaviour function
app.changeCheckboxOnFocus = (event) => {
    const keyCode = event.keyCode;
    const spacebarKeyCode = 32;
    const enterKeyCode = 13;

    // if a key is pressed but it is not spacebar or enter then behave normally
    if (keyCode && keyCode !== spacebarKeyCode && keyCode !== enterKeyCode) {
        return;
    
    // if a key is pressed and it is spacebar or enter and the checkbox isn't checked, mark it to checked and toggle the animations
    } else if (!app.gradientToggleCheckbox.checked){
        event.preventDefault();
        app.gradientToggleCheckbox.checked = true;
        app.animationToggle();

    // if a key is pressed and it is spacebar or enter and the checkbox is checked, mark it to unchecked, and toggle the animations
    } else {
        event.preventDefault();
        app.gradientToggleCheckbox.checked = false;
        app.animationToggle();
    }
}

// animations toggle function
app.animationToggle = () => {

    // if animations toggle checkbox is checked
    if (app.gradientToggleCheckbox.checked){

        // remove animations and toggle text
        app.body.style.animation = 'none';
        app.body.style.backgroundSize = 'initial';
        app.scrollDownBtn.style.animation = 'none';
        app.scrollDownBtn.style.transform = 'translateX(-50%)';
        app.gradientToggleBtn.title = 'Turn on animations';
        app.gradientToggleText.innerText = 'Turn on animations:';

    // if animations toggle checkbox is unchecked
    } else {

        // reset animations and toggle text 
        app.body.style.animation = '7s infinite ease-in-out gradient';
        app.body.style.backgroundSize = '300% 300%';
        app.scrollDownBtn.style.transform = 'none';
        app.scrollDownBtn.style.animation = '3s infinite ease-in-out pulse';
        app.gradientToggleBtn.title = 'Turn off animations';
        app.gradientToggleText.innerText = 'Turn off animations:';
    }
}

// scroll down function
app.scrollDown = () => {
    let aboutTop = app.aboutSection.offsetTop;

    // smoothly scroll down to top of about section
    window.scrollTo({
        top: aboutTop,
        behavior: `smooth`,
    });
}

app.scrollDownOnFocus = (event) => {
    const keyCode = event.keyCode;
    const enterKeyCode = 13; 

    // if a key is pressed but it is not enter then behave normally
    if (keyCode && keyCode !== enterKeyCode) {
        return;

    // if a key is pressed and it is enter scroll down
    } else {
        app.scrollDown();
    }
}

// scroll to top function
app.scrollTop = () => {

    // smoothly scroll up to top of window
    window.scrollTo({
        top: 0,
        behavior: `smooth`,
    });
}

app.scrollTopOnFocus = (event) => {
    const keyCode = event.keyCode;
    const enterKeyCode = 13; 

    // if a key is pressed but it is not enter then behave normally
    if (keyCode && keyCode !== enterKeyCode) {
        return;

    // if a key is pressed and it is enter scroll down
    } else {
        app.scrollTop();
    }
}

// project read more button function
app.readMore = function(paragraph, button) {

    // if the paragraph has no height
    if (!paragraph.style.maxHeight){

        // reveal text and change button
        paragraph.style.maxHeight = paragraph.scrollHeight + 'px';
        paragraph.style.opacity = '100%'
        button.style.marginBottom = '20px';
        button.innerText = 'Read Less';

    // if the paragraph is showing
    } else {

        // hide text and change button
        paragraph.style.maxHeight = '';
        paragraph.style.opacity = '0%';
        button.style.marginBottom = '';
        button.innerText = 'Read More';
        button.blur();
    }
}

// app event listeners
app.events = () => {

    // on hamburger button click, run hamburger function
    app.hamburger.addEventListener('click', app.hamburgerFunction);

    app.gradientToggleBtn.addEventListener('click', app.animationToggle);

    // for each nav list item link, close nav on click
    app.navLinks.forEach((link) => {
        link.addEventListener('click', app.closeNav)
    })

    // for each project description
    app.projectDesc.forEach((project) => {

        // project description variables
        const paragraph = project.querySelector(`p`);
        const button = project.querySelector(`.read-more`);

        // on button click, run read more function using the paragraph and button variables
        button.addEventListener(`click`, () => app.readMore(paragraph, button));
    })

    // scroll up to top on button click
    app.scrollTopBtn.addEventListener('click', app.scrollTop);

    // scroll down to about section on button click
    app.scrollDownBtn.addEventListener('click', app.scrollDown);

    // show nav when screen embiggens
    window.addEventListener("resize", () => {

        // if window is larger than mobile breakpoint
        if (window.innerWidth >= 768) {

            // display nav
            app.navUl.style.display = 'flex';
            app.navUl.style.opacity = '1';

        // if window is smaller than mobile breakpoint
        } else {

            // hide nav by default
            app.navUl.style.display = '';
            app.navUl.style.opacity = '0';
        }
    })
}

// initialize app function
app.init = () => {
    
    // set animations toggle to unchecked
    app.gradientToggleCheckbox.checked = false;

    // add event listeners
    app.events();
}

// initialize app
app.init();