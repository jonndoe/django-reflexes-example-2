from django.core.cache import cache
from django.views.generic.base import TemplateView


class ChatView(TemplateView):
    subtitle = "Chat"
    template_name = "blog/chat.html"

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context["chats"] = cache.get("chats", [])
        return context
