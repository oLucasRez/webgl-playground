export class GL {
  private static instance: WebGLRenderingContext;
  private static canvas: HTMLCanvasElement;

  static getCanvas() {
    if (GL.canvas) return GL.canvas;

    const canvas: HTMLCanvasElement | null = document.getElementById(
      'game-surface'
    ) as HTMLCanvasElement | null;

    if (!canvas) throw new Error('ERROR getting canvas!');

    GL.canvas = canvas;

    return GL.canvas;
  }

  static getInstance(): WebGLRenderingContext {
    if (GL.instance) return GL.instance;

    const canvas = GL.getCanvas();

    GL.instance =
      canvas.getContext('webgl') ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext);
    if (!GL.instance) alert('Your browser does not support WebGL');

    GL.instance.enable(GL.instance.DEPTH_TEST);

    GL.clear();

    return GL.instance;
  }

  static clear() {
    GL.instance.clearColor(0.15, 0.15, 0.25, 1);
    GL.instance.clear(
      GL.instance.COLOR_BUFFER_BIT | GL.instance.DEPTH_BUFFER_BIT
    );
  }
}
