document.addEventListener("DOMContentLoaded", ()=>{
    
    // get the components
    const task = document.querySelector('#task-field');
    const submit = document.querySelector('#submit-button');

    // make the submit button false as default
    submit.disabled = true;

    // check if the task field is not empty
    task.onkeyup = () => {
        if (task.value.length != 0){
            submit.disabled = false;
        }
        else{
            submit.disabled = true;
        }
    }

    const form = document.querySelector('form');

    form.onsubmit = function(){
        
        // Get the task
        const newTask = task.value;

        // reset tehe value of the field
        task.value = '';

        // Back it to ubsimittable (?)
        submit.disabled = true;

        // get the value
        const li = document.createElement('li');
        li.innerHTML = newTask;

        // add it inside ul
        document.querySelector('#tasks').append(li)
        
        // avoid the from from submitting
        return false;
    }

})