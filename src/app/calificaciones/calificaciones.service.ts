import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { calificacionCreacionDTO, calificacionDTO } from './calificacion';

@Injectable({
  providedIn: 'root',
})
export class CalificacionesService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'calificaciones';

  public crear(calificaciones: calificacionCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', calificaciones);
  }

  public calificaciones(idMateria: number, idPeriodo: number) {
    return this.http.get<calificacionDTO[]>(
      `${this.apiURL}/calificaciones/${idMateria}/${idPeriodo}`
    );
  }
}
