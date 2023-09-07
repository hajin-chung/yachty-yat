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

  const positionAttributeLocation = gl.getAttribLocation(
    shader.program,
    "aPos"
  );

  // Loading Data to GPU
  // create buffer (empty)
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // bind buffer data to positionBuffer
  const positions = generateCube();
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Rendering
  // set clear color
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  // clear color buffer with specifide color
  gl.clear(gl.COLOR_BUFFER_BIT);
  // set to screen space
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


  gl.useProgram(shader.program);

  // use buffer loaded before
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const size = 3;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0; // move by size * sizeof(type)
  const offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  const primitiveType = gl.TRIANGLES;
  // const offset = 0;
  const count = positions.length;
  gl.drawArrays(primitiveType, offset, count);
}

function generateCube() {
  // prettier-ignore
  return [
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
  ];
}
