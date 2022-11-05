import { Vertex } from './vertex';
import { GL } from './gl';

export class ArrayBuffer {
  constructor(private readonly vertices: Vertex[]) {
    const gl = GL.getInstance();

    const object = gl.createBuffer();

    const serial = vertices.reduce(
      (acc, vertex) => [...acc, ...vertex.serialize()],
      [] as number[]
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, object);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(serial), gl.STATIC_DRAW);
  }

  draw() {
    const gl = GL.getInstance();

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length);
  }
}
