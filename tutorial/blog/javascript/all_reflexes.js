import { Application } from 'stimulus'
import StimulusReflex from 'stimulus_reflex'
import WebsocketConsumer from 'sockpuppet-js'
import CableReady from 'cable_ready'
import debounced from 'debounced'

import Examplereflex_With_JsController from './controllers/examplereflex_with_js_controller'
import ChatController from './controllers/chat_controller'
import SignupController from './controllers/signup_controller'
import Blog_SearchController from './controllers/blog_search_controller'
import Post_CommentController from './controllers/post_comment_controller'


debounced.initialize()

const application = Application.start()
const ssl = location.protocol !== 'https:' ? '' : 's';
const consumer = new WebsocketConsumer(`ws${ssl}://${location.hostname}:${location.port}/ws/sockpuppet-sync`)


application.register("examplereflex_with_js", Examplereflex_With_JsController)
application.register("chat", ChatController)
application.register("signup", SignupController)
application.register("blog_search", Blog_SearchController)
application.register("post_comment", Post_CommentController)

StimulusReflex.initialize(application, { consumer, debug: true })
