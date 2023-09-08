attribute vec3 aPosition;

uniform mat4 uProjMat;
uniform mat4 uModelViewMat;

varying vec4 v_color;

void main() {
  gl_Position = uModelViewMat * vec4(aPosition, 0.0);

  v_color = gl_Position * 0.5 + 0.5;
}