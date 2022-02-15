from __future__ import unicode_literals

import django_comments
from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from django.contrib.sites.shortcuts import get_current_site
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from django_comments import signals
from django_comments_xtd import get_form
from django_comments_xtd import get_model as get_comment_model
#from django_comments_xtd import signals
from django_comments_xtd.models import DISLIKEDIT_FLAG, LIKEDIT_FLAG
from django_comments_xtd.utils import (get_app_model_options,
                                       get_current_site_id)
from sockpuppet.reflex import Reflex

XtdComment = get_comment_model()

from django_comments_xtd.views import perform_dislike, perform_like


class PostCommentReflex(Reflex):
    def increment(self, step=1):
        self.count = int(self.element.dataset['count']) + step

    # This is just debug/test function, delete it later on.
    def post(self, comment='no comment was provided'):
        # to do: add comment to database
        print('++++++++++++++++ added comment to database!!!')
        print('++++++++++++++++ comment is', comment)
        print('++++++++++++++++ self.request is:', self.request)
        print('++++++++++++++++ self.params are:', self.params)
        pass

    def replycomment(self):
        self.cid = int(self.element.dataset['cid'])
        cid = int(self.element.dataset['cid'])
        comment = XtdComment.objects.get(pk=cid)
        self.form_reply = get_form()(comment.content_object, comment=comment)
        pass


    def dislikecomment(self):
        request = self.request
        comment_id = int(self.element.dataset['commentid'])
        """
        Dislike a comment. Confirmation on GET, action on POST.

        Templates: :template:`django_comments_xtd/dislike.html`,
        Context:
            comment
                the flagged `comments.comment` object
        """
        comment = get_object_or_404(get_comment_model(), pk=comment_id,
                                    site__pk=get_current_site_id(request))
        if not get_app_model_options(comment=comment)['allow_feedback']:
            ctype = ContentType.objects.get_for_model(comment.content_object)
            raise Http404("Comments posted to instances of '%s.%s' are not "
                          "explicitly allowed to receive 'disliked it' flags. "
                          "Check the COMMENTS_XTD_APP_MODEL_OPTIONS "
                          "setting." % (ctype.app_label, ctype.model))
        flag_qs = comment.flags.prefetch_related('user')\
            .filter(flag=DISLIKEDIT_FLAG)
        users_dislikedit = [item.user for item in flag_qs]
        already_disliked_it = request.user in users_dislikedit
        if already_disliked_it:
            pass
        else:
            perform_dislike(request, comment)

    def likecomment(self):
        request = self.request
        comment_id = int(self.element.dataset['commentid'])
        """
        Like a comment. Confirmation on GET, action on POST.

        Templates: :template:`django_comments_xtd/like.html`,
        Context:
            comment
                the flagged `comments.comment` object
        """
        comment = get_object_or_404(get_comment_model(), pk=comment_id,
                                    site__pk=get_current_site_id(request))
        if not get_app_model_options(comment=comment)['allow_feedback']:
            ctype = ContentType.objects.get_for_model(comment.content_object)
            raise Http404("Comments posted to instances of '%s.%s' are not "
                          "explicitly allowed to receive 'liked it' flags. "
                          "Check the COMMENTS_XTD_APP_MODEL_OPTIONS "
                          "setting." % (ctype.app_label, ctype.model))

        flag_qs = comment.flags.prefetch_related('user') \
                .filter(flag=LIKEDIT_FLAG)
        users_likedit = [item.user for item in flag_qs]
        already_liked_it = request.user in users_likedit
        if already_liked_it:
            pass
        else:
            perform_like(request, comment)

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

    def reply(self):
        print('+++++++++++++++++++ reply to comment!!!')
        pass
