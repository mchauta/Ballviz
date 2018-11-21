from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post
from django.http import HttpResponse
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt



def home(request):
    return render(request, 'blog/home.html')

def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'blog/post_list.html', {'posts': posts})

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    return render(request, 'blog/post_detail.html', {'post': post})

def nba_shotchart(request):
    return render(request, 'blog/nba_shotchart.html')

def testAjax(request):
    if request.method == 'GET':
        message = request.GET['msg']
        return HttpResponse(message) # Sending a success response
    else:
        return HttpResponse("Request method is not a GET")
