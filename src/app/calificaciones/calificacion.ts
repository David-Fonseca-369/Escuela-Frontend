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

export interface calificacionDTO {
  nombre: string;
  matricula: string;
  primerParcial: number;
  segundoParcial: number;
  tercerParcial: number;
}

export interface calificacionesMateriaDTO {
  name: string;
  value: string;
}

export interface calificacionesBoletaDTO {
  nombreMateria: string;
  nombrePeriodo: string;
  calificacion: number;
}
