export interface materiaDTO {
  idMateria: number;
  idGrupo: number;
  nombreGrupo: string;
  idDocente: number;
  nombre: string;
  estado: boolean;
}

export interface materiaGrupoDTO {
  idMateria: number;
  idGrupo: number;
  nombreGrupo: string;
  idDocente: number;
  nombreDocente: string;
  nombre: string;
  estado: boolean;
}

export interface materiaCreacionDTO {
  idGrupo: number;
  idDocente: number;
  nombre: string;
  estado: boolean;
}
