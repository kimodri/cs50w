let counter = 1;
const quantity = 20;

document.addEventListener('DOMContentLoaded', load)

window.onscroll = ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
        load();
    }
};

function load(){
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    fetch(`/posts/posts?start=${start}&end=${end}`)
    .then(response=>response.json())
    .then(data=>{
        data.posts.forEach(addPost);
    })
    // .catch(error=>{
    //     console.log('Error: ', error)
    // })
};

function addPost(contents){
    
    // create a component
    const post = document.createElement('div');
    post.className = "post";
    post.innerHTML = contents;

    // Append
    document.querySelector("#posts").append(post);
};