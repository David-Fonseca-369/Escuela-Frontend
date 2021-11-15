import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { periodoCreacionDTO, periodoDTO } from './periodo';

@Injectable({
  providedIn: 'root',
})
export class PeriodosService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'periodos';

  public obtenerPaginado(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<periodoDTO[]>(this.apiURL + '/todosPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos() {
    return this.http.get<periodoDTO[]>(`${this.apiURL}/todos`);
  }

  public crear(periodo: periodoCreacionDTO) {
    return this.http.post(`${this.apiURL}/crear`, periodo);
  }
}
