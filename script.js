const c  = console.log.bind(document);
const humugerbutton = document.querySelector('.humugerbutton');
const hambuger = document.querySelector('.hambuger');
const menu = document.querySelector('.nav');
const listitem = document.querySelectorAll('.listitem');

const toTop = document.querySelector('#toTop')

const handleClick = () => {
    hambuger.classList.toggle('open');
    menu.classList.toggle('open');
}

humugerbutton.addEventListener('click', handleClick);
listitem.forEach(item => item.addEventListener('click', handleClick))

window.onscroll = () => scrollCheck();

const scrollCheck = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
        toTop.style = "block";
    } else {
        toTop.style.display = "none";
    }
}

const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

toTop.addEventListener('click', scrollTop);