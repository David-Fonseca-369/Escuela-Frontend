import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { alumnoCreacionDTO, alumnoDTO } from './alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + 'alumnos';

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

    return this.http.get<alumnoDTO[]>(this.apiURL + '/todosPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos() {
    return this.http.get<alumnoDTO[]>(`${this.apiURL}/todos`);
  }

  public obtenerPorId(id: number): Observable<alumnoDTO> {
    return this.http.get<alumnoDTO>(`${this.apiURL}/${id}`);
  }

  public crear(grupo: alumnoCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', grupo);
  }

  public editar(id: number, alumno: alumnoCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, alumno);
  }
  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
