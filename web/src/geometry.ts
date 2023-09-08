import { Shader } from "./shader";

export class Geometry {
  positions: Float32Array;
  buffer: WebGLBuffer | null;

  constructor(gl: WebGLRenderingContext, positions: Float32Array) {
    this.buffer = gl.createBuffer();
    this.positions = positions;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  }

  draw(shader: Shader) {
    const gl = shader.gl;
    gl.enableVertexAttribArray(shader.aPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(shader.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, this.positions.length / 3);
  }
}
