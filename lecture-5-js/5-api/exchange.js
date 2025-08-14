const url = 'https://v6.exchangerate-api.com/v6/YOUR_KEY/latest/USD';

document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('form').onsubmit = function(){
        fetch(url)
        .then(response => response.json())
        .then(data=>{

            // Get the key that the user has input
            const key = document.querySelector('#base').value.toUpperCase(); 

            // Get the rate from the response
            const rate = data.conversion_rates[key];

            // Subsitutte the key
            if (rate === undefined){
                document.querySelector('h1').innerHTML = 'Invalid Base.'
            }
            else{
                document.querySelector('h1').innerHTML = `1 USD is equal to ${rate.toFixed(3)} ${key}`
            }
        })
        .catch(error=>{
            console.log('Error:', error);
        })
        return false;
    }
})