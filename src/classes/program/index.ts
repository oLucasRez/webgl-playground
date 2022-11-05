import { GL, Shader } from '..';
import { Attributes, ShaderVariableType } from './types';

export class Program {
  gl: WebGLProgram;

  constructor() {
    const gl = GL.getInstance();

    const glProgram = gl.createProgram();
    if (!glProgram) throw new Error('ERROR creating program!');

    this.gl = glProgram;
  }

  addShader(shader: Shader) {
    const gl = GL.getInstance();

    gl.attachShader(this.gl, shader.glShader);
  }

  compile(attributes: Attributes) {
    const gl = GL.getInstance();

    gl.linkProgram(this.gl);
    if (!gl.getProgramParameter(this.gl, gl.LINK_STATUS))
      throw new Error(
        `ERROR linking program!\n${gl.getProgramInfoLog(this.gl)}`
      );

    gl.validateProgram(this.gl);
    if (!gl.getProgramParameter(this.gl, gl.VALIDATE_STATUS))
      throw new Error(
        `ERROR validating program!\n${gl.getProgramInfoLog(this.gl)}`
      );

    const typeSize: Record<ShaderVariableType, number> = {
      float: 1,
      vec2: 2,
      vec3: 3,
      vec4: 4,
      mat2: 2 * 2,
      mat3: 3 * 3,
      mat4: 4 * 4,
    };

    const vertexSize = Object.values(attributes).reduce(
      (acc, shaderType) =>
        acc + typeSize[shaderType] * Float32Array.BYTES_PER_ELEMENT,
      0
    );

    Object.entries(attributes).reduce((acc, [param, shaderType]) => {
      const location = gl.getAttribLocation(this.gl, param);

      gl.vertexAttribPointer(
        location,
        typeSize[shaderType],
        gl.FLOAT,
        false,
        vertexSize,
        acc * Float32Array.BYTES_PER_ELEMENT
      );

      gl.enableVertexAttribArray(location);

      return acc + typeSize[shaderType];
    }, 0);

    gl.useProgram(this.gl);
  }

  setUniformMatrix(param: string, matrix: Float32Array) {
    const gl = GL.getInstance();

    const location = gl.getUniformLocation(this.gl, param);

    const dimension = Math.sqrt(matrix.length);

    const map: Record<number, () => void> = {
      2: () => gl.uniformMatrix2fv(location, false, matrix),
      3: () => gl.uniformMatrix3fv(location, false, matrix),
      4: () => gl.uniformMatrix4fv(location, false, matrix),
    };

    map[dimension]?.();
  }

  setUniformVector(param: string, vector: Float32Array) {
    const gl = GL.getInstance();

    const location = gl.getUniformLocation(this.gl, param);

    const map: Record<number, () => void> = {
      1: () => gl.uniform1fv(location, vector),
      2: () => gl.uniform2fv(location, vector),
      3: () => gl.uniform3fv(location, vector),
      4: () => gl.uniform4fv(location, vector),
    };

    map[vector.length]?.();
  }
}
