# API
You already know about API especially with python and how you go about manipulating it. However, this time you are going to use **JavaScript**.

## GET
In JS, to get an API response, you do:
```javascript
const url = ''
fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data)
}) 
```
- `fetch`: returns a `promise` (a value that will come through at some point, but not necessarily right away) 