import { Application } from 'stimulus'
import StimulusReflex from 'stimulus_reflex'
import WebsocketConsumer from 'sockpuppet-js'
import Post_CommentController from './controllers/post_comment_controller'

const application = Application.start()
const consumer = new WebsocketConsumer(`ws://${window.location.host}/ws/sockpuppet-sync`)

application.register("post_comment", Post_CommentController)
StimulusReflex.initialize(application, { consumer })
