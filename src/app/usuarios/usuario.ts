export interface usuarioDTO {
  idUsuario: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  estado: boolean;
}

export interface usuarioCreacionDTO {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  password: string;
  estado: boolean;
}
