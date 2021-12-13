import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { organigramaDTO } from '../models/organigrama';

@Injectable({
  providedIn: 'root',
})
export class OrganigramasService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + 'organigramas';

  public obtenerImagen() {
    return this.http.get<organigramaDTO>(this.apiURL + '/organigrama');
  }

  public editar(archivo: File) {
    const formData = this.construirFormulario(archivo);
    return this.http.put(this.apiURL + '/editar', formData);
  }

  construirFormulario(imagen: File): FormData {
    const formData = new FormData();

    formData.append('imagen', imagen);

    return formData;
  }
}
