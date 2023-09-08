export class Shader {
  gl: WebGLRenderingContext;
  program: WebGLProgram;

  // uniform variables
  uProjMat: WebGLUniformLocation | null;
  // uModelViewMat: WebGLUniformLocation | null;

  // vertex attributes
  aPosition: number;

  constructor(
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this.gl = gl;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    this.program = createProgram(gl, vertexShader, fragmentShader);

    this.uProjMat = this.gl.getUniformLocation(this.program, "uProjMat");
    // this.uModelViewMat = this.gl.getUniformLocation(this.program, "uModelViewMat");

    this.aPosition = this.gl.getAttribLocation(this.program, "aPosition");
  }

  static async load(
    gl: WebGLRenderingContext,
    vertexShaderUrl: string,
    fragmentShaderUrl: string
  ) {
    const vertexShaderSource = await loadShader(vertexShaderUrl);
    const fragmentShaderSource = await loadShader(fragmentShaderUrl);
    return new Shader(gl, vertexShaderSource, fragmentShaderSource);
  }

  sendProjMat(projMat: Float32Array) {
    this.gl.uniformMatrix4fv(this.uProjMat, false, projMat);
  }

  // sendModelViewMat(modelViewMat: Float32Array) {
  //   this.gl.uniformMatrix4fv(this.uModelViewMat, false, modelViewMat);
  // }
}

async function loadShader(url: string): Promise<string> {
  const res = await fetch(url);
  const content = await res.text();
  return content;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (shader === null) {
    throw new Error("cannot create shader");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  } else {
    console.error("shader compilation failed");
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);

    throw new Error("cannot compile shader");
  }
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  if (program === null) {
    throw new Error("cannot create program");
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  } else {
    console.error("program link failed");
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);

    throw new Error("cannon link program");
  }
}
