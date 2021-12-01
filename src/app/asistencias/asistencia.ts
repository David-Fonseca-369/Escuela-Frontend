export interface asistenciasCreacionDTO {
  idMateria: number;
  idPeriodo: number;
  fecha: Date;
  detalles: DetalleCreacionDTO[];
}

export interface DetalleCreacionDTO {
  nombre: string;
  matricula: string;
  asistencia: number;
}

export interface asistenciaCabecera {
  idMateria: number;
  idPeriodo: number;
}
