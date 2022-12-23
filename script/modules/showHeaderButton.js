export default function showButton(){
    const headerButton = document.querySelector('[data-headerButton]');

    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 450){
            if(headerButton.classList.contains("none")){
                headerButton.classList.remove("none");
            }
        }else{
            if(!headerButton.classList.contains("none")){
                headerButton.classList.add("none");
            }
        }
    })
}