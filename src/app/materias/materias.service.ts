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

  public materiasDisponiblesPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<materiaDTO[]>(this.apiURL + '/disponiblesPaginacion', {
      observe: 'response',
      params,
    });
  }

  public materiasAsignadasPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number,
    idDocente: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<materiaDTO[]>(
      this.apiURL + '/asignadasPaginacion/' + idDocente,
      {
        observe: 'response',
        params,
      }
    );
  }

  public materiasAsignadasTodas(idDocente: number) {
    return this.http.get<materiaDTO[]>(
      `${this.apiURL}/asignadasTodas/${idDocente}`
    );
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

  public asignar(idDocente: number, idMateria: number) {
    return this.http.put(
      `${this.apiURL}/asignar/${idDocente}/${idMateria}`,
      null
    );
  }

  public quitar(id: number) {
    return this.http.put(`${this.apiURL}/quitar/${id}`, null);
  }
}
