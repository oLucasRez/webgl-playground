import { GL } from './gl';

export class IndexBuffer {
  constructor(private readonly indices: number[]) {
    const gl = GL.getInstance();

    const object = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object);

    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
  }

  draw() {
    const gl = GL.getInstance();

    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
  }
}
