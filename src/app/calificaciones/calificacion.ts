export interface calificacionCabecera {
  idMateria: number;
  idPeriodo: number;
  idEvaluacion: number;
}

export interface calificacionCreacionDTO {
  idMateria: number;
  idPeriodo: number;
  idEvaluacion: number;
  detalles: calificacionDetalleCreacionDTO[];
}

export interface calificacionDetalleCreacionDTO {
  idAlumno: number;
  nombre: string;
  matricula: string;
  calificacion: number;
}
