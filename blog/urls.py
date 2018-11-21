from django.urls import path, re_path
from . import views

urlpatterns = [
    path('nba/shot-charts/', views.nba_shotchart, name='nba_shotchart'),
    path('', views.home, name='home'),
    path('blog/', views.post_list, name='post_list'),
    path('post/<slug:slug>/', views.post_detail, name='post_detail'),
    #path('likepost/$', views.testAjax, name='testAjax'),
    re_path(r'^likepost/$', views.testAjax, name='testAjax')
]
