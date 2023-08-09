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

const fetchMessages = async(options) => {
    const response = await fetch('http://localhost:3000/msg', options);
    const messages = await response.json();
    
    console.log(messages);
}
fetchMessages({ mode:'cors',method: 'GET' })

submitter.addEventListener('click', async(e) => { 
    e.preventDefault();
    if (!form.getElementsByTagName("input")[0].value ||
        !form.getElementsByTagName("input")[1].value ||
        !form.getElementsByTagName("textarea")[0].value
        ) {
        return alert('Please fill out all the fields of the form.')
    }else {
        await fetchMessages({ mode:'cors', method: 'POST', body: JSON.stringify({
            "name": form.getElementsByTagName("input")[0].value,
            "email": form.getElementsByTagName("input")[1].value,
            "message": form.getElementsByTagName("textarea")[0].value
        }), headers: { 'Content-Type': 'application/json' } })
    }
    
});
// submitter.removeEventListener('click')
