import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { asistenciasCreacionDTO } from './asistencia';

@Injectable({
  providedIn: 'root',
})
export class AsistenciasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'asistencias';

  public crear(asistencias: asistenciasCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', asistencias);
  }
}
