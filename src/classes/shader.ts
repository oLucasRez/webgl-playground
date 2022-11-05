import { GL } from './gl';

export class Shader {
  glShader: WebGLShader;

  constructor(type: number, script: string[]) {
    const gl = GL.getInstance();

    const glShader = gl.createShader(type);
    if (!glShader) throw new Error('ERROR creating shader!');

    this.glShader = glShader;

    gl.shaderSource(this.glShader, script.join('\n'));

    gl.compileShader(this.glShader);
    if (!gl.getShaderParameter(this.glShader, gl.COMPILE_STATUS))
      throw new Error(
        `ERROR compiling shader!\n${gl.getShaderInfoLog(this.glShader)}`
      );
  }
}

export class VertexShader extends Shader {
  constructor(...script: string[]) {
    const gl = GL.getInstance();

    super(gl.VERTEX_SHADER, script);
  }
}

export class FragmentShader extends Shader {
  constructor(...script: string[]) {
    const gl = GL.getInstance();

    super(gl.FRAGMENT_SHADER, script);
  }
}
