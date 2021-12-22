import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { formatearFecha } from 'src/app/helpers/helpers';
import { environment } from 'src/environments/environment';
import { encuestaCreacionDTO, encuestaDTO } from '../models/encuesta';

@Injectable({
  providedIn: 'root',
})
export class EncuestasService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + 'encuestas';

  public Crear(encuesta: encuestaCreacionDTO): Observable<encuestaDTO> {
    const formData = this.construirFormulario(encuesta);
    return this.http.post<encuestaDTO>(this.apiURL + '/crear', formData);
  }

  private construirFormulario(encuesta: encuestaCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('idAlumno', String(encuesta.idAlumno));
    formData.append('estadoCivil', encuesta.estadoCivil);
    formData.append('nacionalidad', encuesta.nacionalidad);
    formData.append('idiomas', encuesta.idiomas);
    formData.append('tipoSangre', encuesta.tipoSangre);
    formData.append('seguroSocial', encuesta.seguroSocial);
    formData.append('grado', encuesta.grado);
    formData.append('grupo', encuesta.grupo);
    formData.append('semestre', encuesta.semestre);
    formData.append('facebook', encuesta.facebook);
    formData.append('twitter', encuesta.twitter);

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
    formData.append('telefono', encuesta.telefono);
    formData.append('celular', encuesta.celular);
    formData.append('correo', encuesta.correo);
    formData.append('domicilio', encuesta.domicilio);
    formData.append('archivo', encuesta.archivo);

    return formData;
  }
}
