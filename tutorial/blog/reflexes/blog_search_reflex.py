from blog.models import Post
from django.db.models import Q
from sockpuppet.reflex import Reflex


class BlogSearchReflex(Reflex):
    def perform(self, query=""):

        posts = Post.objects.filter(
            Q(title__icontains=query) | Q(title__icontains=query)
        )

        self.posts = posts
        self.count = len(posts)
