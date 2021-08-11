from django.conf import settings
from django.urls import include, path
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import TemplateView

import debug_toolbar


urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    path(r'comments/', include('django_comments_xtd.urls')),
    path(r'admin/', admin.site.urls),
    path(r'blog/', include('blog.urls', namespace='blog')),
    path(r'', TemplateView.as_view(template_name="home.html"),
        name='homepage'),
]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
