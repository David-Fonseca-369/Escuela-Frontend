import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { grupoCreacionDTO, grupoDTO } from './indice-grupos/grupo';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + 'grupos';

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

    return this.http.get<grupoDTO[]>(this.apiURL + '/todosPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos() {
    return this.http.get<grupoDTO[]>(`${this.apiURL}/todos`);
  }

  public obtenerPorId(id: number): Observable<grupoDTO> {
    return this.http.get<grupoDTO>(`${this.apiURL}/${id}`);
  }

  public crear(grupo: grupoCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', grupo);
  }

  public editar(id: number, grupo: grupoCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, grupo);
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
