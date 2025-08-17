import time
from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, "posts_animation/index.html")

def posts(request):
    start = int(request.GET.get('start') or 0)
    end = int(request.GET.get('end') or start + 9)

    # Create a list of posts
    data = [f"Post #{i}" for i in range(start, end + 1)]

    time.sleep(2)
    return JsonResponse({
        "posts": data
    })
