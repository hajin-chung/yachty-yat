import { Geometry } from "./geometry";
import { Mat4 } from "./math/matrix";
import { Shader } from "./shader";

main().catch((e) => console.error(e));

async function main() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (canvas === null) {
    console.error("canvas not found");
    return;
  }
  console.log(canvas.width, canvas.height);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const gl = canvas.getContext("webgl");
  if (gl === null) {
    console.error("browser doesn't support webgl");
    return;
  }

  const shader = await Shader.load(
    gl,
    "/shaders/vert.glsl",
    "/shaders/frag.glsl"
  );

  const cube = initCube(gl);

  const geometry = [cube];
  drawScene(gl, shader, geometry);
}

function drawScene(
  gl: WebGLRenderingContext,
  shader: Shader,
  geometry: Geometry[]
) {
  // Rendering
  // set clear color
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  // clear color buffer with specifide color
  gl.clear(gl.COLOR_BUFFER_BIT);
  // set to screen space
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.useProgram(shader.program);

  geometry.forEach((g) => {
    g.draw(shader);
  });

  const projMat = createProjMat();
  shader.sendProjMat(projMat);
}

function initCube(gl: WebGLRenderingContext) {
  // prettier-ignore
  const positions = new Float32Array([
    -0.5, -0.5, -0.5,
     0.5, -0.5, -0.5,
    -0.5,  0.5, -0.5,
    -0.5,  0.5, -0.5,
     0.5,  0.5, -0.5,
     0.5, -0.5, -0.5,

    -0.5, -0.5,  0.5,
     0.5, -0.5,  0.5,
    -0.5,  0.5,  0.5,
    -0.5,  0.5,  0.5,
     0.5,  0.5,  0.5,
     0.5, -0.5,  0.5,
    
     0.5, -0.5, -0.5,
     0.5,  0.5, -0.5,
     0.5,  0.5,  0.5,
     0.5,  0.5,  0.5,
     0.5, -0.5,  0.5,
     0.5, -0.5, -0.5,
    
     -0.5, -0.5, -0.5,
     -0.5,  0.5, -0.5,
     -0.5,  0.5,  0.5,
     -0.5,  0.5,  0.5,
     -0.5, -0.5,  0.5,
     -0.5, -0.5, -0.5,

     -0.5, -0.5, -0.5,
      0.5, -0.5, -0.5,
      0.5, -0.5,  0.5,
      0.5, -0.5,  0.5,
     -0.5, -0.5, -0.5,
     -0.5, -0.5,  0.5,

     -0.5,  0.5, -0.5,
      0.5,  0.5, -0.5,
      0.5,  0.5,  0.5,
      0.5,  0.5,  0.5,
     -0.5,  0.5, -0.5,
     -0.5,  0.5,  0.5,
  ]);

  return new Geometry(gl, positions);
}

function createProjMat() {
  return Mat4.identity();
}