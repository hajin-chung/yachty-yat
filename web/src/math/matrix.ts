export class Mat4 {
  static identity() {
    // prettier-ignore
    return new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  }

  static translation(dx: number, dy: number, dz: number) {
    // prettier-ignore
    return new Float32Array([
      1, 0, 0, dx,
      0, 1, 0, dy,
      0, 0, 1, dz,
      0, 0, 0, 1,
    ]);
  }

  static xRotation(angle: number) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    return new Float32Array([
      1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1,
    ]);
  }

  static yRotation(angle: number) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    return new Float32Array([
      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1,
    ]);
  }

  static zRotation(angle: number) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    return new Float32Array([
      c, -s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  }

  static scaling(sx: number, sy: number, sz: number) {
    // prettier-ignore
    return new Float32Array([
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1,
    ]);
  }

  static multiply(a: Float32Array, b: Float32Array) {
    const res = new Float32Array(16).fill(0);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          res[4 * i + j] += a[4 * i + k] * b[4 * k + j];
        }
      }
    }

    return res;
  }
}
