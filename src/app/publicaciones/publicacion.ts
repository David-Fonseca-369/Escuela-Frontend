import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';

export interface publicacionCreacionDTO {
  idMateria: number;
  idPeriodo: number;
  nombre: string;
  fechaEntrega: Date;
  descripcion: string;
  //   archivo: File;
  //Archivos
  archivos: File[];
}

export interface archivoCreacionDTO {
  archivo: File;
}

export interface publicacionDTO {
  idPublicacion: number;
  nombre: string;
  fechaCreacion: string;
}

export interface publicacionDetallesDTO {
  nombre: string;
  fechaEntrega: Date;
  descripcion: string;
  archivos: archivoDTO[];
}

export interface archivoDTO {
  nombre: string;
  rutaArchivo: string;
}
