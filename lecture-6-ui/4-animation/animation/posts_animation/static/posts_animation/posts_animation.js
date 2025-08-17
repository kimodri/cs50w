let counter = 1;
const quantity = 20;

document.addEventListener('DOMContentLoaded', load);

document.addEventListener('click', (event)=>{
    const target = event.target;
    if (target.className === 'hide'){
        target.parentElement.style.animationPlayState = 'running';
        target.parentElement.addEventListener('animationend', ()=>{
            target.parentElement.remove();
        })
    }
})

window.onscroll = ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
        load();
    }
};

function load(){
    const start = counter;
    const end = quantity + start - 1;
    counter = end + 1;

    fetch(`posts?start=${start}&end=${end}`)
    .then(response=> response.json())
    .then(data=>{
        data.posts.forEach(addPost);
    })
    // .catch(error=>{
    //     console.log("Error: ", error);
    // });
}

function addPost(content){
    // Create an element
    const div = document.createElement('div');
    div.innerHTML = `${content} <button class="hide">Hide</button>`;
    div.className = 'post'

    // add it inside the div container
    document.querySelector('#posts_container').append(div);
}