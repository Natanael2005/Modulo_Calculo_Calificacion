function calcularCalificacionFinal(
  promedio_tareas,
  promedio_quizzes,
  calificacion_examen_final,
  porcentaje_asistencia,
  ponderacion_tareas,
  ponderacion_quizzes,
  ponderacion_examen_final
) {
  const vals = [
    promedio_tareas,
    promedio_quizzes,
    calificacion_examen_final,
    porcentaje_asistencia,
    ponderacion_tareas,
    ponderacion_quizzes,
    ponderacion_examen_final
  ];
  if (!vals.every(n => typeof n === 'number' && Number.isFinite(n))) return -1.0;

  const between = (n, min, max) => n >= min && n <= max;
  if (
    !between(promedio_tareas, 0, 10) ||
    !between(promedio_quizzes, 0, 10) ||
    !between(calificacion_examen_final, 0, 10) ||
    !Number.isInteger(porcentaje_asistencia) ||
    !between(porcentaje_asistencia, 0, 100) ||
    !between(ponderacion_tareas, 0, 1) ||
    !between(ponderacion_quizzes, 0, 1) ||
    !between(ponderacion_examen_final, 0, 1)
  ) return -1.0;

  const sum = ponderacion_tareas + ponderacion_quizzes + ponderacion_examen_final;
  if (Math.abs(sum - 1) > 1e-9) return -1.0;

  if (porcentaje_asistencia < 80 || calificacion_examen_final < 6.0) return 5.0;

  const result =
    promedio_tareas * ponderacion_tareas +
    promedio_quizzes * ponderacion_quizzes +
    calificacion_examen_final * ponderacion_examen_final;

  return Math.round(result * 10) / 10;
}

module.exports = { calcularCalificacionFinal };
