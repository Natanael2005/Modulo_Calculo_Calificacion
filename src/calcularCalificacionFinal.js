function calcularCalificacionFinal(
  promedio_tareas,
  promedio_quizzes,
  calificacion_examen_final,
  porcentaje_asistencia,
  ponderacion_tareas,
  ponderacion_quizzes,
  ponderacion_examen_final
) {
  const isFiniteNumber = (n) => typeof n === 'number' && Number.isFinite(n);
  const inRangeInc = (n, min, max) => n >= min && n <= max;

  const inputs = [
    promedio_tareas,
    promedio_quizzes,
    calificacion_examen_final,
    porcentaje_asistencia,
    ponderacion_tareas,
    ponderacion_quizzes,
    ponderacion_examen_final,
  ];
  if (!inputs.every(isFiniteNumber)) return -1.0;

  if (
    !inRangeInc(promedio_tareas, 0, 10) ||
    !inRangeInc(promedio_quizzes, 0, 10) ||
    !inRangeInc(calificacion_examen_final, 0, 10) ||
    !inRangeInc(porcentaje_asistencia, 0, 100) ||
    !Number.isInteger(porcentaje_asistencia) ||
    !inRangeInc(ponderacion_tareas, 0, 1) ||
    !inRangeInc(ponderacion_quizzes, 0, 1) ||
    !inRangeInc(ponderacion_examen_final, 0, 1)
  ) {
    return -1.0;
  }

  const suma = ponderacion_tareas + ponderacion_quizzes + ponderacion_examen_final;
  const EPS = 1e-9;
  if (Math.abs(1.0 - suma) > EPS) return -1.0;

  if (porcentaje_asistencia < 80) return 5.0;
  if (calificacion_examen_final < 6.0) return 5.0;

  const resultado =
    promedio_tareas * ponderacion_tareas +
    promedio_quizzes * ponderacion_quizzes +
    calificacion_examen_final * ponderacion_examen_final;

  return Math.round(resultado * 10) / 10; // 1 decimal
}

module.exports = { calcularCalificacionFinal };
