
const { calcularCalificacionFinal } = require('../src/calcularCalificacionFinal');

describe('calcularCalificacionFinal', () => {
  test('Aprobado: 8.25 -> 8.3', () => {
    const n = calcularCalificacionFinal(8.5, 9.0, 7.5, 90, 0.3, 0.3, 0.4);
    expect(n).toBe(8.3);
  });

  test('Reprobado por asistencia (<80% => 5.0)', () => {
    const n = calcularCalificacionFinal(10, 10, 10, 79, 0.3, 0.3, 0.4);
    expect(n).toBe(5.0);
  });

  test('Reprobado por examen (<6.0 => 5.0)', () => {
    const n = calcularCalificacionFinal(10, 10, 5.9, 100, 0.3, 0.3, 0.4);
    expect(n).toBe(5.0);
  });

  test('Cálculo < 7.0 devuelve el valor calculado (6.4)', () => {
    const n = calcularCalificacionFinal(6.0, 6.0, 7.0, 85, 0.3, 0.3, 0.4);
    expect(n).toBe(6.4);
  });

  test('Error: ponderaciones != 1.0 => -1.0', () => {
    const n = calcularCalificacionFinal(8, 8, 8, 90, 0.3, 0.3, 0.3);
    expect(n).toBe(-1.0);
  });

  test('Error: fuera de rango => -1.0', () => {
    const n = calcularCalificacionFinal(11, 8, 8, 90, 0.3, 0.3, 0.4);
    expect(n).toBe(-1.0);
  });

  test('Frontera asistencia (=80% válido, todo 10 => 10.0)', () => {
    const n = calcularCalificacionFinal(10, 10, 10, 80, 0.3, 0.3, 0.4);
    expect(n).toBe(10.0);
  });

  // Extras
  test('Asistencia no entera (90.5) => -1.0', () => {
    const n = calcularCalificacionFinal(8, 8, 8, 90.5, 0.3, 0.3, 0.4);
    expect(n).toBe(-1.0);
  });

  test('Tolerancia flotante (0.1+0.2+0.7≈1.0) => 9.0', () => {
    const n = calcularCalificacionFinal(9, 9, 9, 100, 0.1, 0.2, 0.7);
    expect(n).toBe(9.0);
  });

  test('Orden de validaciones (ponderaciones inválidas => -1.0)', () => {
    const n = calcularCalificacionFinal(10, 10, 10, 70, 0.5, 0.5, 0.2);
    expect(n).toBe(-1.0);
  });

  test('Redondeo a 1 decimal (8.249→8.2, 8.251→8.3)', () => {
    const a = calcularCalificacionFinal(8.249, 8.249, 8.249, 100, 1/3, 1/3, 1/3);
    const b = calcularCalificacionFinal(8.251, 8.251, 8.251, 100, 1/3, 1/3, 1/3);
    expect(a).toBe(8.2);
    expect(b).toBe(8.3);
  });
});