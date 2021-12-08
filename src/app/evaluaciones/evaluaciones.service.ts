import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { evaluacionDTO } from './evaluacion';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionesService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'evaluaciones';

  public obtenerEvaluaciones() {
    return this.http.get<evaluacionDTO[]>(this.apiURL);
  }
}
