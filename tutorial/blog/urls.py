from django.conf.urls import url
from django.urls import path

from blog.views.views import PostListView, PostDetailView, SearchResultView
from blog.views.examplereflex import ExamplereflexView
from blog.views.examplereflex_with_js import ExamplereflexWithJsView
from blog.views.chat import ChatView
from blog.views.signup import SignupView
from blog.views.blog_search import BlogSearchView


app_name = 'blog'

urlpatterns = [
    url(r'^$', PostListView.as_view(), name='post_list'),
    url(r'^(?P<year>\d{4})/(?P<month>\w{3})/(?P<day>\d{2})/(?P<slug>[-\w]+)/$',
        PostDetailView.as_view(), name='post_detail'),
    path('search/', SearchResultView.as_view(), name='search_result'),
    path('example-reflex/', ExamplereflexView.as_view(), name='example_reflex'),
    path('example-reflex-js/', ExamplereflexWithJsView.as_view(), name='example_reflex_js'),
    path('chat-reflex/', ChatView.as_view(), name='chat_reflex'),
    path('signup-reflex/', SignupView.as_view(), name='signup_reflex'),
    path('blog-search-reflex/', BlogSearchView.as_view(), name='blog_search_reflex'),
]
