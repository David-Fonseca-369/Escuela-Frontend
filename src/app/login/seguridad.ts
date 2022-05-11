export interface loginUsuarioDTO {
  correo: string;
  password: string;
}

export interface loginAlumnoDTO {
  curp: string;
  password: string;
}

export interface respuestaAutenticacion {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rol : string;
  token: string;
  expiracion: string;
}

export interface datosUsuarioDTO {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rol: string;
  correo: string;
}

export interface actualizarPasswordDTO {
  password: string;
}
