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


//select form data

const form = document.querySelector('#form');
const submitter = document.querySelector(".btnsubmit");
const input = document.querySelector("textarea");

const baseUrl = 'https://mywebsite-backend-mocha.vercel.app/api/';

const fetchData = async(url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    
    return data;
}

fetchData(`${ baseUrl }msg`, { mode:'cors', method: 'GET' })
 
submitter.addEventListener('click', async(e) => { 
    e.preventDefault();
    if (!form.getElementsByTagName("input")[0].value ||
        !form.getElementsByTagName("input")[1].value ||
        !form.getElementsByTagName("textarea")[0].value
        ) {
        return alert('Please fill out all the fields of the form.')
    }else {
        await fetchData(`${baseUrl}msg`,{ mode:'cors', method: 'POST', body: JSON.stringify({
            "name": form.getElementsByTagName("input")[0].value,
            "email": form.getElementsByTagName("input")[1].value,
            "message": form.getElementsByTagName("textarea")[0].value
        }), headers: { 'Content-Type': 'application/json' } });
        alert('Message sent successfully');
    }
    form.getElementsByTagName("input")[0].value = ''
    form.getElementsByTagName("input")[1].value = ''
    form.getElementsByTagName("textarea")[0].value = ''
    
});

// create project dynamically

 const projects = fetchData(`${ baseUrl }project`, { mode: 'cors', method: 'GET' });
 const projectsHTML = document.querySelector('.projects-content');

 projects.then((ps) => ps.map( p => {
    projectsHTML.innerHTML += `
    <div class="project">
        <div class="project-title">${ p.title }</div>
        <div class="project-pic"><img src="${ p.screenShot }" alt="mou sacco"></div>
        <div class="project-description"><p>${ p.description }</p></div>
        <div class="btns">
            <button><a href="${ p.gitLink }">view code</a></button>
            <button><a href="${ p.projectLink }" target="_blank">run live</a></button>
        </div>
    </div>     
    `
 }   
 ));

// carousel

const gap = 16;

const carousel = document.querySelector('#carousel');
const content = carousel.querySelector('#content');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

next.addEventListener('click', e => { 
    carousel.scrollBy(width + gap, 0 );
    if(carousel.scrollWidth !== 0 ) {
        prev.style.display = 'flex';
    }
    if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = 'none';
    }
});

prev.addEventListener('click', e => {
    carousel.scrollBy(-(width - gap), 0);
    if (carousel.scrollLeft - width -gap <= 0) {
        prev.style.display = 'none';
    }
    if (!content.scrollLeft - width - gap <= carousel.scrollLeft + width) {
        next.style.display = 'flex';
    }
});

let width = carousel.offsetWidth;
window.addEventListener('resize', e => {
    width = carousel.offsetWidth;
})

// add class to navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', e => {
    const h = window.scrollY;
    if (h > 50) {
        navbar.classList.add('scroll');
    } else {
        navbar.classList.remove('scroll');
    }

})