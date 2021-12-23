import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

export interface encuestaDTO {
  idEncuesta: number;
  nombreAlumno: string;
  curpAlumno: string;
  generoAlumno: string;
  fechaNacimientoAlumno: Date;
  edadAlumno: number;
  telefonoAlumno: string;
  correoAlumno: string;
  domicilioAlumno: string;
  estadoCivil: string;
  nacionalidad: string;
  idiomas: string;
  tipoSangre: string;
  seguroSocial: string;
  grado: string;
  grupo: string;
  semestre: string;
  facebook: string;
  twitter: string;
  nombreTutor: string;
  parentesco: string;
  fechaNacimiento: Date;
  edadTutor: number;
  ine: string;
  curp: string;
  genero: string;
  estadoCivilTutor: string;
  ocupacion: string;
  estudios: string;
  telefono: string;
  celular: string;
  correo: string;
  domicilio: string;
  rutaArchivo: string;
}

export interface encuestaCreacionDTO {
  idAlumno: number;
  estadoCivil: string;
  nacionalidad: string;
  idiomas: string;
  tipoSangre: string;

  seguroSocial: string;
  grado: string;
  grupo: string;
  semestre: string;
  facebook: string;
  twitter: string;
  nombreTutor: string;
  parentesco: string;
  fechaNacimiento: Date;
  ine: string;
  curp: string;
  genero: string;
  estadoCivilTutor: string;
  ocupacion: string;
  estudios: string;
  telefono: string;
  celular: string;
  correo: string;
  domicilio: string;
  archivo: File;
}

export interface respuestaEncuestaDTO {
  idEncuesta: number;
}
