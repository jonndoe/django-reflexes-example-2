from sockpuppet.reflex import Reflex


class ExamplereflexReflex(Reflex):
    def increment(self, step=1):
        self.count = int(self.element.dataset["count"]) + step
