import { Controller } from 'stimulus';
import StimulusReflex from 'stimulus_reflex';

export default class extends Controller {
  connect() {
    StimulusReflex.register(this)
  }

  increment(event) {
    console.log('increment')
    event.preventDefault()
    this.stimulate('post_commentReflex#increment', 1)
  }

  post(event) {
    console.log('comment posted')
    event.preventDefault()
    this.stimulate('post_commentReflex#post', 'default comment')
  }

}
