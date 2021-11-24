export interface alumnoDTO {
  idAlumno: number;
  idGrupo: number;
  nombreGrupo: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  matricula: string;
  correo: string;
  telefono: string;
  fechaNacimiento: Date;
  genero: string;
  direccion: string;
  nombreTutor: string;
  numeroTutor: string;
  estado: boolean;
}

export interface alumnoCreacionDTO {
  idGrupo: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  matricula: string;
  correo: string;
  telefono: string;
  fechaNacimiento: Date;
  genero: string;
  direccion: string;
  nombreTutor: string;
  numeroTutor: string;
  password: string;
}
