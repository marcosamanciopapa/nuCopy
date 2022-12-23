export default function navSections(){
    const navSections = document.querySelectorAll('[data-menu_hover]');
    const navItens = document.querySelectorAll('[data-navitem]');
    const navIcons = document.querySelectorAll('.nav__icon');


    function untapNavIcon(){
        navIcons.forEach((icon)=>{
            icon.classList.remove('nav__icon--reverse');
        })
    }

    function tapNavIcon(icon){
        icon.classList.add("nav__icon--reverse");
    }

    function adcItemListerners(){
        navItens.forEach((item)=>{
            item.addEventListener('click', encreasePosition);
        })
    }

    function deacreasePosition(){
        navSections.forEach((section)=>{
            if(window.screen.width > 1024){
                section.classList.remove('menu_hover--position');
            }else{
                section.style.display = "none";
            }
            
        })
        untapNavIcon();
        stopWaiting();
        adcItemListerners();
    }

    function documentEvent(){
        navItens.forEach((item)=>{
            item.removeEventListener('click', encreasePosition);
        })
        document.addEventListener('click', deacreasePosition);
    }


    function encreasePosition(e){
        let section = e.currentTarget.querySelector('[data-menu_hover]');
        if(window.screen.width > 1024){
            section.classList.add('menu_hover--position');
        }else{
            section.style.display = 'flex';
        }
        tapNavIcon(e.currentTarget.querySelector(".nav__icon"));
        let waiting = setTimeout(documentEvent, 1000);
    }

    function stopWaiting(){
        document.removeEventListener('click',deacreasePosition);
    }

    adcItemListerners();

}