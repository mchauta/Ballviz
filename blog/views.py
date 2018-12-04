from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post
from django.http import HttpResponse
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
from nba_api.stats.static import players
import json



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

def test_plot(request):
    data = [3,1,4,1,5]
    plt.plot(data)
    plt.ylabel('some numbers')

    stringIObytes = io.BytesIO()
    plt.savefig(stringIObytes, format='png')
    stringIObytes.seek(0)
    base64_data = base64.b64encode(stringIObytes.read())

    return HttpResponse(base64_data)

def find_players(request):
    if request.method == 'GET':
        term = request.GET['term'];
        foundPlayers = json.dumps(players.find_players_by_full_name(term));
        return HttpResponse(foundPlayers) # Sending a success response
    else:
        return HttpResponse("Request method is not a GET")
