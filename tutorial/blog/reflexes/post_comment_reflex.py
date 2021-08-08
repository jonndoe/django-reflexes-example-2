from sockpuppet.reflex import Reflex
from django.apps import apps
import django_comments
from django_comments import signals
from django_comments.views.utils import next_redirect, confirmation_view
from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site

class PostCommentReflex(Reflex):
    def increment(self, step=1):
        self.count = int(self.element.dataset['count']) + step

    def post(self, comment='no comment was provided'):
        # to do: add comment to database
        print('++++++++++++++++ added comment to database!!!')
        print('++++++++++++++++ comment is', comment)
        print('++++++++++++++++ self.request is:', self.request)
        print('++++++++++++++++ self.params are:', self.params)
        pass

    def postcomment(self, next=None, using=None):
        """
        Post a comment.

        HTTP POST is required. If ``POST['submit'] == "preview"`` or if there are
        errors a preview template, ``comments/preview.html``, will be rendered.
        """
        # Fill out some initial data fields from an authenticated user, if present

        #data = self.request.POST.copy()
        data = self.params
        if self.request.user.is_authenticated:
            if not data.get('name', ''):
                data["name"] = self.request.user.get_full_name() or self.request.user.get_username()
            if not data.get('email', ''):
                data["email"] = self.request.user.email

        # Look up the object we're trying to comment about
        ctype = data.get("content_type")
        object_pk = data.get("object_pk")
        try:
            model = apps.get_model(*ctype.split(".", 1))
            target = model._default_manager.using(using).get(pk=object_pk)
        except TypeError:
            return None

        # Do we want to preview the comment?
        preview = "preview" in data

        # Construct the comment form
        form = django_comments.get_form()(target, data=data)

        # Check security information
        if form.security_errors():
            return 'Failed , Security Errors!!!'

        # If there are errors or if we requested a preview show the comment
        if form.errors or preview:
            template_list = [
                # These first two exist for purely historical reasons.
                # Django v1.0 and v1.1 allowed the underscore format for
                # preview templates, so we have to preserve that format.
                "comments/%s_%s_preview.html" % (model._meta.app_label, model._meta.model_name),
                "comments/%s_preview.html" % model._meta.app_label,
                # Now the usual directory based template hierarchy.
                "comments/%s/%s/preview.html" % (model._meta.app_label, model._meta.model_name),
                "comments/%s/preview.html" % model._meta.app_label,
                "comments/preview.html",
            ]
            return render(self.request, template_list, {
                    "comment": form.data.get("comment", ""),
                    "form": form,
                    "next": data.get("next", next),
                },
            )

        # Otherwise create the comment
        comment = form.get_comment_object(site_id=get_current_site(self.request).id)
        comment.ip_address = self.request.META.get("REMOTE_ADDR", None) or None
        if self.request.user.is_authenticated:
            comment.user = self.request.user

        # Signal that the comment is about to be saved
        responses = signals.comment_will_be_posted.send(
            sender=comment.__class__,
            comment=comment,
            request=self.request
        )

        for (receiver, response) in responses:
            if response is False:
                return "comment_will_be_posted receiver killed the comment"

        # Save the comment and signal that it was saved
        comment.save()
        signals.comment_was_posted.send(
            sender=comment.__class__,
            comment=comment,
            request=self.request
        )

        #return next_redirect(request, fallback=next or 'comments-comment-done',
                             #c=comment._get_pk_val())