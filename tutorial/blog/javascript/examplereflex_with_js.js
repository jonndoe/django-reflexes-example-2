import { Application } from 'stimulus'
import StimulusReflex from 'stimulus_reflex'
import WebsocketConsumer from 'sockpuppet-js'
import Examplereflex_With_JsController from './controllers/examplereflex_with_js_controller'

const application = Application.start()
const consumer = new WebsocketConsumer(`ws://${window.location.host}/ws/sockpuppet-sync`)

application.register("examplereflex_with_js", Examplereflex_With_JsController)
StimulusReflex.initialize(application, { consumer })
