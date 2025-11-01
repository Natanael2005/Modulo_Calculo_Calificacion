const { calcularCalificacionFinal } = require('../src/calcularCalificacionFinal');

describe('calcularCalificacionFinal — Pruebas solicitadas', () => {
//Aprobado

  test('1) Aprobado: 8.25 a 8.3', () => {
    const n = calcularCalificacionFinal(8.5, 9.0, 7.5, 90, 0.3, 0.3, 0.4);
    expect(n).toBe(8.3);
  });

//Reprobado por Asistencia 
  test('2) Reprobado por Asistencia: 79% a 5.0', () => {
    const n = calcularCalificacionFinal(10.0, 10.0, 10.0, 79, 0.3, 0.3, 0.4);
    expect(n).toBe(5.0);
  });

//Reprobado por Examen Final 
  test('3) Reprobado por Examen Final: 5.9 a 5.0', () => {
    const n = calcularCalificacionFinal(10.0, 10.0, 5.9, 100, 0.3, 0.3, 0.4);
    expect(n).toBe(5.0);
  });

//Reprobado por Calificación 
  test('4) Reprobado por Calificación: resultado 6.4', () => {
    const n = calcularCalificacionFinal(6.0, 6.0, 7.0, 85, 0.3, 0.3, 0.4);
    expect(n).toBe(6.4);
  });

  
  test('5) Error: Ponderación Inválida ', () => {
    const n = calcularCalificacionFinal(8.0, 8.0, 8.0, 90, 0.3, 0.3, 0.3);
    expect(n).toBe(-1.0);
  });

//Calificación Fuera de Rango

  test('6) Error: Calificación Fuera de Rango ', () => {
    const n = calcularCalificacionFinal(11.0, 8.0, 8.0, 90, 0.3, 0.3, 0.4);
    expect(n).toBe(-1.0);
  });

  test('7) Caso Frontera Asistencia: 80% ', () => {
    const n = calcularCalificacionFinal(10.0, 10.0, 10.0, 80, 0.3, 0.3, 0.4);
    expect(n).toBe(10.0);
  });
});
