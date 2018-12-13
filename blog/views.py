from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post
from django.http import HttpResponse
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Rectangle, Arc
from matplotlib.offsetbox import  OffsetImage
import io, datetime, base64, json, urllib.request
from nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo, playergamelog, shotchartdetail
import pandas as pd
import seaborn as sns
import NBAapi as nba



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
        term = request.GET['term']
        foundPlayers = json.dumps(players.find_players_by_full_name(term))
        return HttpResponse(foundPlayers) # Sending a success response
    else:
        return HttpResponse("Request method is not a GET")

def player_info(request):
    if request.method == 'GET':
        id = request.GET['id']
        info = commonplayerinfo.CommonPlayerInfo(player_id=id)
        info = info.get_normalized_json()
        return HttpResponse(info) # Sending a success response
    else:
        return HttpResponse("Request method is not a GET")

def get_games(request):
    if request.method == 'GET':
        id = request.GET['id']
        year = request.GET['season']
        type = request.GET['seasonType']
        games = playergamelog.PlayerGameLog(player_id=id, season_all=year, season_type_all_star=type)
        games = games.get_normalized_json()
        return HttpResponse(games) # Sending a success response
    else:
        return HttpResponse("Request method is not a GET")



def make_chart(request):
    if request.method == 'GET':
        date = datetime.datetime.today().strftime('%m-%d-%Y')
        response = {}
        plt.clf()
        teamID = '0';
        theme = request.GET['theme']
        #type = request.GET['type']
        seasonType = request.GET['seasonType']
        playerID = request.GET['playerID']
        season = request.GET['season']
        #gameID = request.GET['gameID']
        info = shotchartdetail.ShotChartDetail(
            player_id = playerID,
            team_id = teamID,
            season_type_all_star = seasonType,
            season_nullable = season,
            context_measure_simple = 'FG_PCT',

            )
        info = info.get_json()
        shotChartData = json.loads(info)
        shots = shotChartData['resultSets'][0]['rowSet']
        shotHeaders = shotChartData['resultSets'][0]['headers']
        avg = shotChartData['resultSets'][1]['rowSet']
        avgHeaders = shotChartData['resultSets'][1]['headers']

        if (shots) :
            shot_df = pd.DataFrame(shots, columns=shotHeaders)
            la_df = pd.DataFrame(avg, columns=avgHeaders)

            fig = plt.figure(figsize=(12,10))

            plot = nba.plot.grantland_shotchart(shotchart = shot_df, leagueaverage= la_df, season = season, seasonType = seasonType)
            plt.text(0,-8,'data by: stats.nba.com '+ date, fontsize=7,horizontalalignment='center',verticalalignment='center')
            plt.text(0,-9,'chart by: ballviz.com',fontsize=7,horizontalalignment='center',verticalalignment='center')

            stringIObytes = io.BytesIO()
            plt.savefig(stringIObytes, format='png', bbox_inches='tight', pad_inches=0.1, dpi=300)
            stringIObytes.seek(0)
            base64_data = base64.b64encode(stringIObytes.read())

            base64_data = base64_data.decode("utf8")

            response = {'dataFound': True, 'imageData': base64_data}

        else :
            response = {'dataFound': False, 'imageData': ''}


        response = json.dumps(response)
        return HttpResponse(response) # Sending a success response
    else:
        return HttpResponse("Request method is not a GET")
