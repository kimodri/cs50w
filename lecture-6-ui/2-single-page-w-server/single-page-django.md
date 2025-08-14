# Utlizing Django for a Single Page
This is not so different from the previous lesson however we have backend this time. Basically, what the backend will do is just supply the content that we will be presenting using **javascript**.

Now, when we use the previous method we have data in our `html` file they are just hidden and so we are still loading them therefore it can be more efficient to use a server to access these contents.

- We will use `Django` to send and receive infomation from our single page application.

---
Let's say we have an application called `section` 

- and so in `urls.py`:
```python
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sections/<int:num>", views.section, name="section")
]
```
- In `views.py`:
```python
from django.http import HttpResponse, Http404
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "singlepage/index.html")

# The texts are much longer in reality, but have
# been shortened here to save space
texts = ["Text 1", "Text 2", "Text 3"]

def section(request, num):
    if 1 <= num <= 3:
        return HttpResponse(texts[num - 1])
    else:
        raise Http404("No such section")
```
---
## Fetching from the backend
```html
...
<script>
    function showSection(section){
        fetch(`/sections/${section}`)
        .then(response => response.text)
        .then(data=>{
            document.querySelector('#content').innerHTML = text;
        });
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        document.querySelectorAll('button').forEach(button=>{
            button.onclick function(){
                showSection(this.dataset.section)
            };
        });
    });
</script>

</head>
    <body>
        <h1>Hello!</h1>
        <button data-section="1">Section 1</button>
        <button data-section="2">Section 2</button>
        <button data-section="3">Section 3</button>
        <div id="content">
        </div>
    </body>
</html>
```

---
## URL Not Changing

- A disadvantage of dynamically changing content with JavaScript is that the URL stays the same.
- This means the URL is less informative — if you refresh or share the link, you might lose the current view.
- To solve this, we use the **JavaScript History API**.
    - It lets us add custom entries to the browser history and manually update the URL without reloading the page.
    - We can also store extra data with each history entry so we know what to show when going back/forward.
- The method we use is:
    - `history.pushState(stateObj, title, url)`
        - **stateObj** → an object we choose (e.g., `{ section: 3 }`) that will be saved with this history entry.
        - **title** → ignored by most browsers.
        - **url** → what appears in the address bar.
- Later, when the user clicks the browser’s back or forward button, the browser fires the `popstate` event.
    - `event.state` inside `onpopstate` contains the exact `stateObj` we saved earlier with `pushState`.
    - This is how we can retrieve the saved `section` number and reload that section without a full page reload.
- If we never used `pushState`, then `event.state` will be `null`, and we’d have to figure out what to display using something else like `location.pathname` or `location.hash`.

```javascript
// When back arrow is clicked, show previous section
window.onpopstate = function(event) {
    console.log(event.state.section);
    showSection(event.state.section);
}

function showSection(section) {
    fetch(`/sections/${section}`)
    .then(response => response.text())
    .then(text => {
        console.log(text);
        document.querySelector('#content').innerHTML = text;
    });

}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button').forEach(button => {
        button.onclick = function() {
            const section = this.dataset.section;

            // Add the current state to the history
            history.pushState({section: section}, "", `section${section}`);
            showSection(section);
        };
    });
});
```
---
### History Stack Visualization
```css
Start:
[ Page A(state=null) ]  <- current

Click "Section 2":
pushState({section: 2}, "", "section2")
[ Page A(null) ] [ Page A({section: 2}) ]  <- current

Click "Section 5":
pushState({section: 5}, "", "section5")
[ Page A(null) ] [ Page A({section: 2}) ] [ Page A({section: 5}) ] <- current

Click browser "Back":
onpopstate event → event.state = {section: 2}
[ Page A(null) ] [ Page A({section: 2}) ] <- current
```
---
### Setting the Initial State

- On the first page load, the initial history entry has `event.state = null` unless we set it manually.
- If we want the first page to have a state object (e.g., `{ section: 1 }`), we can use:

```javascript
// Set state for the initial history entry
history.replaceState({ section: 1 }, "", "section1");
```
- `replaceState` works like `pushState` but replaces the state of the current history entry instead of adding a new one.

---
### Important: History State ≠ Server Routing
- pushState and replaceState do not automatically create a working URL on the server.
- If you type /section/1 in a new tab or incognito:

    - The browser sends a request to the server.

    - If the server doesn’t know how to handle /section/1, it will return a 404 error.

- To make `/section/1` load correctly on a fresh page visit, your server needs to handle that URL.

In Django, this means adding a URL pattern and view for `/section/<number>`.

Example Django view:
```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("section/<int:section_id>/", views.section_view, name="section"),
]

# views.py
from django.shortcuts import render

def section_view(request, section_id):
    # Fetch or generate the section content
    context = {"section": section_id}
    return render(request, "section.html", context)
```