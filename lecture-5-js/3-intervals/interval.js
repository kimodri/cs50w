// Interval is a function in js that allows you to run a function in a specific time

// For example with counter.html, instead of incrementing the count every time we click the button
// we increment the counter every 2 seconds

let counter = 0;
function count(){
    counter++;
    document.querySelector('h1').innerHTML = counter;
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector('button').onclick = count;

    // here is the interval
    setInterval(count, 2000)
})

// The problem with this is that everytime we refresh the page, we get 0, now wouldn't it be nice if we could
// store the value of the user?
// That is the next lesson about