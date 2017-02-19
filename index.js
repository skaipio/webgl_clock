function App() {
  const self = this;
  var clock = new Clock();

  //Create App
  PhiloGL('stage', {
    program: {
      from: 'ids',
      vs: 'shader-vs',
      fs: 'shader-fs'
    },
    onError: function() {
      alert("An error ocurred while loading the application");
    },
    onLoad: function(app) {
      self.app = app;
      self.view = new PhiloGL.Mat4;
      self.renderer = new Renderer(app);

      self.renderer.init();

      function tick() {
        self.renderer.drawScene(clock);
        clock.update();
        PhiloGL.Fx.requestAnimationFrame(tick);
      }

      tick();
    }
  });
}

function startApp() {
  // Update time display every 10 ms
  const timeDisplay = $('#time-display');
  setInterval(() => {
    var now = new Date();
    timeDisplay.text(now.toLocaleTimeString());
  }, 10);

  // Unpack modules to global scope
  PhiloGL.unpack();

  // Start clock app
  const app = new App();
}
