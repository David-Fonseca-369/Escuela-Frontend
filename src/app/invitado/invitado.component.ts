import { Component, OnInit } from '@angular/core';
import { GaleriasService } from '../configuracion-pagina/servicios/galerias.service';
import { parsearErroresAPI } from '../helpers/helpers';

@Component({
  selector: 'app-invitado',
  templateUrl: './invitado.component.html',
  styleUrls: ['./invitado.component.css'],
})
export class InvitadoComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];
  imagenesCarousel = [];

  constructor(private galeriasService: GaleriasService) {}
  // images = [
  //   { path: '/assets/images/resenia/alum.jpg' },
  //   { path: '/assets/images/resenia/alumn.jpg' },
  //   { path: '/assets/images/resenia/Escolta.jpg' },
  //   { path: '/assets/images/resenia/estudiantes.jpg' },
  //   { path: '/assets/images/resenia/escuela.png' },
  //   { path: '/assets/images/resenia/primera_escolta.jpg' },
  // ];

  ngOnInit(): void {
    this.obtenerImagenesGaleria();
  }

  obtenerImagenesGaleria() {
    this.isLoading = true;
    this.galeriasService.obtenerImagenesTodas().subscribe(
      (imagenesGaleria) => {
        if (imagenesGaleria.length > 0) {
          imagenesGaleria.forEach((element) => {
            this.imagenesCarousel.push({ path: element.ruta });
          });

          // console.log(this.imagenesCarousel);
        }

        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
}
