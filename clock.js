const flatten = (arr) => arr.reduce((a, b) => a.concat(b));
const red = [1, 0, 0, 1];
const green = [0, 1, 0, 1];
const white = [1, 1, 1, 1];

function Clock() {
  const depth = -4;
  const self = this;
  this.sides = 12;
  this.parts = {
    outerEdges: ModelCreator.createCircleLoop(this.sides),
    secondsPointer: ModelCreator.createLine(0.90, red),
    minutesPointer: ModelCreator.createLine(0.95),
    hoursPointer: ModelCreator.createLine(0.80, green)
  }

  this.update = () => {
    var now = new Date();

    setPartRotation('secondsPointer', -getPointerAngle(now.getSeconds(), 60));
    setPartRotation('minutesPointer', -getPointerAngle(now.getMinutes(), 60));
    setPartRotation('hoursPointer', -getPointerAngle(now.getHours(), 12));
  }

  this.getPart = (partKey) => this.parts[partKey];

  Object.keys(this.parts).forEach(function(key) {
    var prop = self.getPart(key);
    prop.position.set(0, 0, depth);
  });

  const setPartRotation = (partKey, rotation) => {
    var part = this.getPart(partKey);
    part.rotation.set(0, 0, rotation);
  }

  const getPointerAngle = (time, divisor) => {
    return time / divisor * Math.PI * 2;
  }
}
const fullAngle = 2 * Math.PI;
const angleOffset = Math.PI / 2;

function ModelCreator() {}

ModelCreator.createLine = (length, color) => {
  if (!color) {
    color = white;
  }
  var modelData = {
    vertices: [0, 0, 0,
               0, length, 0],
    colors: flatten([color,
                     color])
  };
  return new O3D.Model(modelData);
};

ModelCreator.createCircleLoop = (sides) => {
  var angle = fullAngle / sides;
  var vertexPositions = [];
  var vertexColors = [];
  for (var side = 0; side < sides; ++side) {
    var finalAngle = angle * side + angleOffset;
    var x = Math.cos(finalAngle), y = Math.sin(finalAngle);
    vertexPositions.push([x, y, 0]);
    vertexColors.push(white);
  }
  var modelData = {
    vertices: flatten(vertexPositions),
    colors: flatten(vertexColors)
  };
  return new O3D.Model(modelData);
};
