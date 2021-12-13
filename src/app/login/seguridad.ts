export interface loginUsuarioDTO {
  correo: string;
  password: string;
}

export interface loginAlumnoDTO {
  curp: string;
  password: string;
}

export interface respuestaAutenticacion {
  token: string;
  expiracion: string;
}
