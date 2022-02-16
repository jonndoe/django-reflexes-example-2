from blog.models import Post
from django.contrib import admin


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "publish", "allow_comments")
    list_filter = ("publish",)
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "publish"
    ordering = ["publish"]
    fieldsets = (
        (None, {"fields": ("title", "slug", "body", "allow_comments", "publish",)}),
    )
