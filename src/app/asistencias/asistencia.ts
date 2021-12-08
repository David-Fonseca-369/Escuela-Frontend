export interface asistenciasCreacionDTO {
  idMateria: number;
  idPeriodo: number;
  fecha: Date;
  detalles: DetalleCreacionDTO[];
}

export interface DetalleCreacionDTO {
  idAlumno: number;
  nombre: string;
  matricula: string;
  asistencia: number;
}

export interface asistenciaCabecera {
  idMateria: number;
  idPeriodo: number;
}

export interface asistenciasDTO {
  nombre: string;
  matricula: string;
  asistenciasTotal: number;
  retardosTotal: number;
  faltasTotal: number;
  asistencias: asistenciaFechaDTO[];
  totalAsistencias: number;
}

export interface asistenciaFechaDTO {
  asistencia: number;
  fecha: Date;
}

export interface asistenciasTablaDTO {
  fechas: Date[];
  asistencias: asistenciasDTO;
  totalAsistencias: number;
}
