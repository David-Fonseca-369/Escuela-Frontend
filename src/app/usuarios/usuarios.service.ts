import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { usuarioCreacionDTO, usuarioDTO } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'usuarios';

  public obtenerPaginadoDocentes(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<usuarioDTO[]>(this.apiURL + '/DocentesPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerDocentes() {
    return this.http.get<usuarioDTO[]>(`${this.apiURL}/Docentes`);
  }

  public obtenerPorId(id: number): Observable<usuarioDTO> {
    return this.http.get<usuarioDTO>(`${this.apiURL}/${id}`);
  }

  public crearDocente(usuario: usuarioCreacionDTO) {
    return this.http.post(this.apiURL + '/crearDocente', usuario);
  }

  public editar(id: number, usuario: usuarioCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, usuario);
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }

  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
