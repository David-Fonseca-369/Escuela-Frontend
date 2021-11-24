export interface loginUsuarioDTO {
  correo: string;
  password: string;
}

export interface respuestaAutenticacion {
  token: string;
  expiracion: string;
}
