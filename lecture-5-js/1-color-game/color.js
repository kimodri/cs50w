document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelectorAll('button').forEach((button)=>{
        button.onclick = function(){
            document.querySelector('.main').style.backgroundColor = button.dataset.color;
        }
    })
    document.querySelector('select').onchange = function(){
        document.querySelector('.main').style.backgroundColor = this.value;
    }
})
