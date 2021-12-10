import { HttpClient, HttpParams } from '@angular/common/http';
import { jsDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../helpers/helpers';
import {
  publicacionCreacionDTO,
  publicacionDetallesDTO,
  publicacionDTO,
} from './publicacion';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'publicaciones';

  public obtenerPaginacion(
    idMateria: number,
    idPeriodo: number,
    pagina: number,
    cantidadRegistrosAMostrar: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<publicacionDTO[]>(
      this.apiURL + '/todosPaginacion/' + idMateria + '/' + idPeriodo,
      {
        observe: 'response',
        params,
      }
    );
  }
  public obtenerPorId(idPublicacion: number) {
    return this.http.get<publicacionDetallesDTO>(
      `${this.apiURL}/${idPublicacion}`
    );
  }

  public eliminar(idPublicacion: number) {
    return this.http.delete(this.apiURL + '/eliminar/' + idPublicacion);
  }

  public crear(publicacion: publicacionCreacionDTO) {
    const formData = this.construirFormulario(publicacion);
    return this.http.post(`${this.apiURL}/crear`, formData);
  }

  private construirFormulario(publicacion: publicacionCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('idMateria', String(publicacion.idMateria));
    formData.append('idPeriodo', String(publicacion.idPeriodo));
    formData.append('nombre', publicacion.nombre);

    if (publicacion.fechaEntrega) {
      formData.append('fechaEntrega', formatearFecha(publicacion.fechaEntrega));
    }

    if (publicacion.descripcion) {
      formData.append('descripcion', publicacion.descripcion);
    }

    if (publicacion.archivos) {
      // console.log('si llegan ');
      // console.log(publicacion.archivos);
      publicacion.archivos.forEach((element) => {
        formData.append('archivos', element);
      });
    }

    return formData;
  }
}
