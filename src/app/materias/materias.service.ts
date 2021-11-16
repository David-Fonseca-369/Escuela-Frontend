import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { materiaCreacionDTO, materiaDTO } from './materia';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + 'materias';

  public obtenerPaginado(pagina: number, cantidadRegistrosAMostrar: number) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<materiaDTO[]>(this.apiURL + '/todosPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos() {
    return this.http.get<materiaDTO[]>(`${this.apiURL}/todos`);
  }

  public obtenerPorId(id: number): Observable<materiaDTO> {
    return this.http.get<materiaDTO>(`${this.apiURL}/${id}`);
  }

  public crear(materia: materiaCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', materia);
  }

  public editar(id: number, materia: materiaCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, materia);
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
