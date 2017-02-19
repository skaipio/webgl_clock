function Renderer(app) {
  const canvas = app.canvas;
  const view = new PhiloGL.Mat4;
  const gl = app.gl;
  const program = app.program;
  const camera = app.camera;

  const setupElement = (elem) => {
    //update element matrix
    elem.update();
    //get new view matrix out of element and camera matrices
    view.mulMat42(camera.view, elem.matrix);
    //set buffers with element data
    program.setBuffers({
      'aVertexPosition': {
        value: elem.vertices,
        size: 3
      },

      'aVertexColor': {
        value: elem.colors,
        size: 4
      }
    });
    //set uniforms
    program.setUniform('uMVMatrix', view);
    program.setUniform('uPMatrix', camera.projection);
  }

  this.init = () => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    camera.view.id();
  }

  this.drawScene = (clock) => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    drawClock(clock);
  }

  const drawClock = (clock) => {
    //Draw clock
    var outerEdges = clock.getPart('outerEdges');
    setupElement(outerEdges);
    gl.drawArrays(gl.LINE_LOOP, 0, clock.sides);

    Object.keys(clock.parts).forEach(function(key) {
      if (key === 'outerEdges') return;

      var pointer = clock.getPart(key);
      drawPointer(pointer);
    });
  }

  const drawPointer = (pointer) => {
    setupElement(pointer);
    gl.drawArrays(gl.LINES, 0, 2);
  }
}
