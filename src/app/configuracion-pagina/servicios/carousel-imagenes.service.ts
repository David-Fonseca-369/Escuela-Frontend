import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { carousel_ImagenDTO } from '../models/carousel_imagen';

@Injectable({
  providedIn: 'root',
})
export class CarouselImagenesService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'carousel_imagenes';

  public obtenerTodos() {
    return this.http.get<carousel_ImagenDTO[]>(`${this.apiURL}/todos`);
  }

  public crear(archivo: File) {
    const formData = this.construirFormulario(archivo);
    return this.http.post(this.apiURL, formData);
  }

  public eliminar(id: number) {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }

  construirFormulario(imagen: File): FormData {
    const formData = new FormData();

    formData.append('imagen', imagen);

    return formData;
  }
}
