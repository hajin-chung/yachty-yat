attribute vec4 aPos;

varying vec4 v_color;

void main() {
  gl_Position = aPos;

  v_color = gl_Position * 0.5 + 0.5;
}