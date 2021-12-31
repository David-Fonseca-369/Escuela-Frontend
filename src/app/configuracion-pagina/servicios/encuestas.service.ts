import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { formatearFecha } from 'src/app/helpers/helpers';
import { environment } from 'src/environments/environment';
import {
  encuestaCreacionDTO,
  encuestaDTO,
  indiceEncuestaDTO,
  respuestaEncuestaDTO,
} from '../models/encuesta';

@Injectable({
  providedIn: 'root',
})
export class EncuestasService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + 'encuestas';

  public Crear(
    encuesta: encuestaCreacionDTO
  ): Observable<respuestaEncuestaDTO> {
    const formData = this.construirFormulario(encuesta);
    return this.http.post<respuestaEncuestaDTO>(
      this.apiURL + '/crear',
      formData
    );
  }

  public obtenerComprobante(idEncuesta: number): Observable<encuestaDTO> {
    return this.http.get<encuestaDTO>(
      `${this.apiURL}/comprobante/${idEncuesta}`
    );
  }

  public obtenerTodasPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();

    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<indiceEncuestaDTO[]>(
      this.apiURL + '/todasPaginacion',
      { observe: 'response', params }
    );
  }

  public filtrarTodas(valores: any): Observable<any> {
    const params = new HttpParams({ fromObject: valores });

    return this.http.get<indiceEncuestaDTO[]>(`${this.apiURL}/filtrarTodas`, {
      params,
      observe: 'response',
    });
  }

  public eliminar(id: number) {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }

  private construirFormulario(encuesta: encuestaCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('idAlumno', String(encuesta.idAlumno));
    formData.append('estadoCivil', encuesta.estadoCivil);
    formData.append('nacionalidad', encuesta.nacionalidad);

    if (encuesta.idiomas) {
      formData.append('idiomas', encuesta.idiomas);
    }

    formData.append('tipoSangre', encuesta.tipoSangre);
    formData.append('seguroSocial', encuesta.seguroSocial);
    formData.append('grado', encuesta.grado);
    formData.append('grupo', encuesta.grupo);
    formData.append('semestre', encuesta.semestre);

    if (encuesta.facebook) {
      formData.append('facebook', encuesta.facebook);
    }

    if (encuesta.twitter) {
      formData.append('twitter', encuesta.twitter);
    }

    formData.append('nombreTutor', encuesta.nombreTutor);
    formData.append('parentesco', encuesta.parentesco);
    formData.append(
      'fechaNacimiento',
      formatearFecha(encuesta.fechaNacimiento)
    );
    formData.append('ine', encuesta.ine);
    formData.append('curp', encuesta.curp);
    formData.append('genero', encuesta.genero);
    formData.append('estadoCivilTutor', encuesta.estadoCivilTutor);
    formData.append('ocupacion', encuesta.ocupacion);
    formData.append('estudios', encuesta.estudios);

    if (encuesta.telefono) {
      formData.append('telefono', encuesta.telefono);
    }

    if (encuesta.celular) {
      formData.append('celular', encuesta.celular);
    }

    if (encuesta.correo) {
      formData.append('correo', encuesta.correo);
    }

    formData.append('domicilio', encuesta.domicilio);
    formData.append('archivo', encuesta.archivo);

    return formData;
  }
}
