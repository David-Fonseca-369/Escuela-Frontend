import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  asistenciasCreacionDTO,
  asistenciasDTO,
  asistenciasTablaDTO,
} from './asistencia';

@Injectable({
  providedIn: 'root',
})
export class AsistenciasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'asistencias';

  public crear(asistencias: asistenciasCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', asistencias);
  }

  public obtenerAsistencias(
    idMateria: number,
    idPeriodo: number,
    idGrupo: number,
    desde: string,
    hasta: string
  ) {
    return this.http.get<asistenciasTablaDTO>(
      `${this.apiURL}/obtenerAsistencias/${idMateria}/${idPeriodo}/${idGrupo}/${desde}/${hasta}`
    );
  }
}
