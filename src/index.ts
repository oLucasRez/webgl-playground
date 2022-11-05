import {
  ArrayBuffer,
  FragmentShader,
  Program,
  Vertex,
  Vector,
  VertexShader,
  GL,
  IndexBuffer,
} from './classes';

import { glMatrix, mat4 } from 'gl-matrix';

const vertPosition = 'vertPosition';
const vertColor = 'vertColor';

const mWorld = 'mWorld';
const mView = 'mView';
const mProj = 'mProj';

const vertexShader = new VertexShader(
  'precision mediump float;',
  '',
  `attribute vec3 ${vertPosition};`,
  `attribute vec3 ${vertColor};`,
  'varying vec3 fragColor;',
  `uniform mat4 ${mWorld};`,
  `uniform mat4 ${mView};`,
  `uniform mat4 ${mProj};`,
  '',
  'void main() {',
  '  fragColor = vertColor;',
  '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
  '}'
);

const fragmentShader = new FragmentShader(
  'precision mediump float;',
  '',
  'varying vec3 fragColor;',
  '',
  'void main() {',
  ' gl_FragColor = vec4(fragColor, 1.0);',
  '}'
);

const program = new Program();

program.addShader(vertexShader);
program.addShader(fragmentShader);

const left = 1;
const down = -1;
const front = -1;
const right = -1;
const top = 1;
const back = 1;

const ltfCorner = new Vector(left, top, front);
const ltbCorner = new Vector(left, top, back);
const ldfCorner = new Vector(left, down, front);
const ldbCorner = new Vector(left, down, back);
const rtfCorner = new Vector(right, top, front);
const rtbCorner = new Vector(right, top, back);
const rdfCorner = new Vector(right, down, front);
const rdbCorner = new Vector(right, down, back);

const hton = (...digits: number[]) =>
  digits.reverse().reduce((acc, value, i) => value * Math.pow(16, i) + acc, 0) /
  255;

const B = 11;
const C = 12;
const D = 13;
const E = 14;
const F = 15;

const blue = new Vector(hton(3, 9), hton(C, 1), hton(D, B));
const green = new Vector(hton(6, 0), hton(E, 4), hton(3, 3));
const white = new Vector(hton(E, F), hton(E, 8), hton(E, B));
const orange = new Vector(hton(F, F), hton(6, 4), hton(1, 4));
const red = new Vector(hton(F, E), hton(1, 9), hton(3, 4));
const yellow = new Vector(hton(F, 3), hton(F, 9), hton(0, 5));

const vertices = [
  // top
  new Vertex({
    [vertPosition]: ltfCorner,
    [vertColor]: white,
  }),
  new Vertex({
    [vertPosition]: rtfCorner,
    [vertColor]: white,
  }),
  new Vertex({
    [vertPosition]: rtbCorner,
    [vertColor]: white,
  }),
  new Vertex({
    [vertPosition]: ltbCorner,
    [vertColor]: white,
  }),

  // left
  new Vertex({
    [vertPosition]: ltfCorner,
    [vertColor]: blue,
  }),
  new Vertex({
    [vertPosition]: ldfCorner,
    [vertColor]: blue,
  }),
  new Vertex({
    [vertPosition]: ldbCorner,
    [vertColor]: blue,
  }),
  new Vertex({
    [vertPosition]: ltbCorner,
    [vertColor]: blue,
  }),

  // right
  new Vertex({
    [vertPosition]: rtfCorner,
    [vertColor]: green,
  }),
  new Vertex({
    [vertPosition]: rdfCorner,
    [vertColor]: green,
  }),
  new Vertex({
    [vertPosition]: rdbCorner,
    [vertColor]: green,
  }),
  new Vertex({
    [vertPosition]: rtbCorner,
    [vertColor]: green,
  }),

  // front
  new Vertex({
    [vertPosition]: rtfCorner,
    [vertColor]: orange,
  }),
  new Vertex({
    [vertPosition]: ltfCorner,
    [vertColor]: orange,
  }),
  new Vertex({
    [vertPosition]: ldfCorner,
    [vertColor]: orange,
  }),
  new Vertex({
    [vertPosition]: rdfCorner,
    [vertColor]: orange,
  }),

  // back
  new Vertex({
    [vertPosition]: rtbCorner,
    [vertColor]: red,
  }),
  new Vertex({
    [vertPosition]: ltbCorner,
    [vertColor]: red,
  }),
  new Vertex({
    [vertPosition]: ldbCorner,
    [vertColor]: red,
  }),
  new Vertex({
    [vertPosition]: rdbCorner,
    [vertColor]: red,
  }),

  // down
  new Vertex({
    [vertPosition]: ldfCorner,
    [vertColor]: yellow,
  }),
  new Vertex({
    [vertPosition]: rdfCorner,
    [vertColor]: yellow,
  }),
  new Vertex({
    [vertPosition]: rdbCorner,
    [vertColor]: yellow,
  }),
  new Vertex({
    [vertPosition]: ldbCorner,
    [vertColor]: yellow,
  }),
];

const indices = [
  // top
  0 * 4 + 0,
  0 * 4 + 1,
  0 * 4 + 2,
  0 * 4 + 0,
  0 * 4 + 2,
  0 * 4 + 3,

  // left
  1 * 4 + 0,
  1 * 4 + 1,
  1 * 4 + 2,
  1 * 4 + 0,
  1 * 4 + 2,
  1 * 4 + 3,

  // right
  2 * 4 + 0,
  2 * 4 + 1,
  2 * 4 + 2,
  2 * 4 + 0,
  2 * 4 + 2,
  2 * 4 + 3,

  // front
  3 * 4 + 0,
  3 * 4 + 1,
  3 * 4 + 2,
  3 * 4 + 0,
  3 * 4 + 2,
  3 * 4 + 3,

  // back
  4 * 4 + 0,
  4 * 4 + 1,
  4 * 4 + 2,
  4 * 4 + 0,
  4 * 4 + 2,
  4 * 4 + 3,

  // down
  5 * 4 + 0,
  5 * 4 + 1,
  5 * 4 + 2,
  5 * 4 + 0,
  5 * 4 + 2,
  5 * 4 + 3,
];

const worldMatrix = new Float32Array(4 * 4);
const viewMatrix = new Float32Array(4 * 4);
const projMatrix = new Float32Array(4 * 4);

mat4.identity(worldMatrix);
mat4.lookAt(
  viewMatrix,
  [0, 0, -5], // onde estou
  [0, 0, 0], // para onde olho
  [0, 1, 0] // qual direção é "para cima"
);
mat4.perspective(
  projMatrix,
  glMatrix.toRadian(45), // campo de visão (em rad)
  GL.getCanvas().width / GL.getCanvas().height, // proporção largura/altura
  0.1, // limite anterior da caixa de visão
  1_000.0 // limite posterior da caixa de visão
);

const xRotationMatrix = new Float32Array(4 * 4);
const yRotationMatrix = new Float32Array(4 * 4);

const buffer = new IndexBuffer(indices);
new ArrayBuffer(vertices);

program.compile({
  [vertPosition]: 'vec3',
  [vertColor]: 'vec3',
});

const identityMatrix = new Float32Array(4 * 4);
mat4.identity(identityMatrix);

program.setUniformMatrix(mWorld, worldMatrix);
program.setUniformMatrix(mView, viewMatrix);
program.setUniformMatrix(mProj, projMatrix);

var angle = 0;

function loop() {
  angle = (performance.now() / 1000 / 6) * 2 * Math.PI;
  mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1, 0]);
  mat4.rotate(yRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
  mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix);

  program.setUniformMatrix(mWorld, worldMatrix);

  GL.clear();

  buffer.draw();

  requestAnimationFrame(loop);
}

(function main() {
  loop();
})();
