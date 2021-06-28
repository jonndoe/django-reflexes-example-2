from django.conf.urls import url
from django.urls import path

from blog.views import PostListView, PostDetailView, SearchResultView, SearchPageView

from blog.models import Post


app_name = 'blog'


urlpatterns = [
    url(r'^$', PostListView.as_view(), name='post_list'),
    url(r'^(?P<year>\d{4})/(?P<month>\w{3})/(?P<day>\d{2})/(?P<slug>[-\w]+)/$',
        PostDetailView.as_view(), name='post_detail'),
    path('search/', SearchResultView.as_view(), name='search_result'),
    path('search-page/', SearchPageView.as_view(), name='search_page'),
]
