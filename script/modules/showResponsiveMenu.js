export default function showResponsiveMenu(){
    const menuHamburger = document.querySelector('[data-hamburger]');
    const close = document.querySelector('[data-close]');
    const nav = document.querySelector('[data-nav]');

    menuHamburger.addEventListener('click', ()=>{
        nav.classList.add('nav__less_screen');
    })

    close.addEventListener('click', ()=>{
        nav.classList.remove('nav__less_screen');
    })

}